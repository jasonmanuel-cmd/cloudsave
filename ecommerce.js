import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder';
let supabase;
try {
    supabase = createClient(supabaseUrl, supabaseKey);
} catch (e) {
    console.warn('Supabase initialization failed. Auth features may be disabled.', e);
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
        const googleBtn = document.getElementById('google-signup');
        if (googleBtn) {
            googleBtn.addEventListener('click', () => this.signUpWithGoogle());
        }

        const emailForm = document.getElementById('email-signup');
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
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: window.location.origin
            }
        });
        if (error) console.error('Error signing up with Google:', error.message);
    },

    async signUpWithEmail() {
        const firstName = document.getElementById('member-first-name').value;
        const lastName = document.getElementById('member-last-name').value;
        const email = document.getElementById('member-email').value;
        const phone = document.getElementById('member-phone').value;

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
        await supabase.auth.signOut();
        this.user = null;
        this.updateProfileUI();
    },

    updateProfileUI() {
        const authUI = document.getElementById('auth-ui');
        const profileUI = document.getElementById('member-profile');
        const userDisplayName = document.getElementById('user-display-name');
        const cardUserName = document.getElementById('card-user-name');

        if (this.user) {
            authUI?.classList.add('hidden');
            profileUI?.classList.remove('hidden');
            const name = this.user.user_metadata.full_name || `${this.user.user_metadata.first_name} ${this.user.user_metadata.last_name}`;
            if (userDisplayName) userDisplayName.innerText = name;
            if (cardUserName) cardUserName.innerText = name;
        } else {
            authUI?.classList.remove('hidden');
            profileUI?.classList.add('hidden');
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
