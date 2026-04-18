import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder';
let supabase;
try {
    supabase = createClient(supabaseUrl, supabaseKey);
} catch (e) {
    console.warn('Supabase initialization failed. Auth features may be disabled.', e);
}

function getAuthElements() {
    return {
        authContainer: document.getElementById('auth-ui') || document.getElementById('auth-container'),
        profileContainer: document.getElementById('member-profile'),
        userDisplayName: document.getElementById('user-display-name') || document.getElementById('member-name'),
        cardUserName: document.getElementById('card-user-name')
    };
}

function getFieldValue(selector) {
    return document.querySelector(selector)?.value?.trim() || '';
}

// Square Configuration
const appId = import.meta.env.VITE_SQUARE_APP_ID || '';
const locationId = import.meta.env.VITE_SQUARE_LOCATION_ID || '';

export const ecommerce = {
    user: null,
    card: null,

    async init() {
        this.checkUser();
        this.setupAuthListeners();
        this.setupCheckout();
    },

    async checkUser() {
        if (!supabase) return;
        const { data: { user } } = await supabase.auth.getUser();
        this.user = user;
        this.updateProfileUI();
    },

    setupAuthListeners() {
        const googleBtn = document.getElementById('google-signup') || document.getElementById('google-login');
        if (googleBtn) {
            googleBtn.addEventListener('click', () => this.signUpWithGoogle());
        }

        const emailForm = document.getElementById('email-signup') || document.getElementById('email-login');
        if (emailForm) {
            emailForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.signUpWithEmail();
            });
        }

        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => this.signOut());
        }
    },

    async signUpWithGoogle() {
        if (!supabase) {
            alert('Member signup is temporarily unavailable.');
            return;
        }

        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: window.location.origin
            }
        });
        if (error) console.error('Error signing up with Google:', error.message);
    },

    async signUpWithEmail() {
        if (!supabase) {
            alert('Member signup is temporarily unavailable.');
            return;
        }

        const firstName = getFieldValue('#member-first-name');
        const lastName = getFieldValue('#member-last-name');
        const email = getFieldValue('#member-email') || getFieldValue('#email-login input[type="email"]');
        const phone = getFieldValue('#member-phone');

        if (!email) {
            alert('Please enter a valid email address.');
            return;
        }

        const { data, error } = await supabase.auth.signUp({
            email,
            password: 'temporaryPassword123!', // Simple demo password
            options: {
                data: {
                    first_name: firstName,
                    last_name: lastName,
                    phone: phone
                }
            }
        });

        if (error) {
            alert(error.message);
        } else {
            alert('Signup successful! Please check your email for verification.');
            this.user = data.user;
            this.updateProfileUI();
        }
    },

    async signOut() {
        if (!supabase) return;
        await supabase.auth.signOut();
        this.user = null;
        this.updateProfileUI();
    },

    updateProfileUI() {
        const { authContainer, profileContainer, userDisplayName, cardUserName } = getAuthElements();

        if (this.user) {
            authContainer?.classList.add('hidden');
            profileContainer?.classList.remove('hidden');
            const metadata = this.user.user_metadata || {};
            const fullName = metadata.full_name || `${metadata.first_name || ''} ${metadata.last_name || ''}`.trim();
            const name = fullName || this.user.email || 'Member';
            if (userDisplayName) userDisplayName.innerText = name;
            if (cardUserName) cardUserName.innerText = name;
        } else {
            authContainer?.classList.remove('hidden');
            profileContainer?.classList.add('hidden');
        }
    },

    async setupCheckout() {
        if (!window.Square) return;

        const payments = window.Square.payments(appId, locationId);
        try {
            this.card = await payments.card();
            await this.card.attach('#sq-card-container');
        } catch (e) {
            console.error('Initializing Card failed', e);
        }

        const purchaseBtn = document.getElementById('sq-purchase');
        purchaseBtn?.addEventListener('click', (e) => {
            e.preventDefault();
            this.handlePayment();
        });
    },

    async handlePayment() {
        const result = await this.card.tokenize();
        if (result.status === 'OK') {
            console.log('Payment token created:', result.token);
            alert('Payment simulation successful! Token: ' + result.token);
            // Here you would send the token to your backend to charge the card
        } else {
            console.error('Payment failed:', result.errors);
            alert('Payment failed: ' + result.errors[0].message);
        }
    },

    showSignupPrompt() {
        if (!this.user) {
            const signupPrompt = document.createElement('div');
            signupPrompt.className = 'signup-prompt glass';
            signupPrompt.innerHTML = `
                <p>JOIN THE CLOUD AVE MEMBERS CLUB FOR EXCLUSIVE REWARDS & EARLY ACCESS.</p>
                <button class="nav-btn" onclick="document.querySelector('[data-tab=members]').click(); document.getElementById('close-cart').click();">SIGN UP NOW</button>
            `;
            document.getElementById('cart-items')?.prepend(signupPrompt);
        }
    }
};
