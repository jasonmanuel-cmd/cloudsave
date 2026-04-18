import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ecommerce } from './ecommerce.js';

gsap.registerPlugin(ScrollTrigger);

// State
const state = {
    cart: [],
    isAgeVerified: false,
    activeTab: 'hero',
    filters: {
        lifestyle: 'all',
        vault: 'all'
    }
};

// Data
const productData = {
    lifestyle: [
        // T-Shirts (4 slots)
        { id: 1, name: 'HGM CYBER TEE - ONYX', type: 'lifestyle', price: 30.00, img: '/images/store/ca-tee-1.png', category: 'tees', isTopSeller: true },
        { id: 2, name: 'HGM NEON LOGO TEE', type: 'lifestyle', price: 30.00, img: '/images/store/ca-tee-2.png', category: 'tees' },
        { id: 3, name: 'CLOUDS OVER BAKO TEE', type: 'lifestyle', price: 30.00, img: '/images/store/ca-tee-3.png', category: 'tees' },
        { id: 4, name: 'AVE HUSTLE TEE - ACID', type: 'lifestyle', price: 35.00, img: '/images/store/ca-tee-4.png', category: 'tees' },
        
        // Hats (3 slots)
        { id: 5, name: 'HGM TRUCKER - CYAN SHINE', type: 'lifestyle', price: 25.00, img: '/images/store/ca-hat-1.png', category: 'hats' },
        { id: 6, name: 'CLOUD AVE SNAPBACK - PINK', type: 'lifestyle', price: 25.00, img: '/images/store/ca-hat-2.png', category: 'hats' },
        { id: 7, name: 'HGM DAD HAT - VINTAGE', type: 'lifestyle', price: 20.00, img: '/images/store/ca-hat-3.png', category: 'hats' },
        
        // Beanies (1 slot)
        { id: 8, name: 'AVE WATCH CAP - BLUE', type: 'lifestyle', price: 20.00, img: '/images/store/ca-beanie-1.png', category: 'beanies', isTopSeller: true },
        
        // Combos (2 slots)
        { id: 9, name: 'CYBER TEE + HAT BUNDLE', type: 'lifestyle', price: 50.00, img: '/images/store/ca-combo-1.png', category: 'combos' },
        { id: 10, name: 'HUSTLE TEE + BEANIE SET', type: 'lifestyle', price: 45.00, img: '/images/store/ca-combo-2.png', category: 'combos' },
        
        // Accessories (5 slots)
        { id: 11, name: 'CLOUD AVE GRINDER - METAL', type: 'lifestyle', price: 15.00, img: '/images/store/ca-acc-1.png', category: 'accessories' },
        { id: 12, name: 'HGM ROLLING TRAY - NEON', type: 'lifestyle', price: 20.00, img: '/images/store/ca-acc-2.png', category: 'accessories' },
        { id: 13, name: 'SMELL-PROOF STASH BAG', type: 'lifestyle', price: 25.00, img: '/images/store/ca-acc-3.png', category: 'accessories' },
        { id: 14, name: 'CLOUD AVE LIGHTER CASE', type: 'lifestyle', price: 10.00, img: '/images/store/ca-acc-4.png', category: 'accessories' },
        { id: 15, name: 'HGM KEYCHAIN - GLOW', type: 'lifestyle', price: 8.00, img: '/images/store/ca-acc-5.png', category: 'accessories' },
    ],
    vault: [
        // Flower (8 spots: 2@$45, 2@$35, 2@$25, 1@$15, 1@$10)
        { id: 101, name: 'HGM PLATINUM OG (3.5g)', type: 'vault', price: 45.00, img: '/images/store/ca-flower-1.png', category: 'flower', isTopSeller: true },
        { id: 102, name: 'VALLEY GELATO (3.5g)', type: 'vault', price: 45.00, img: '/images/store/ca-flower-2.png', category: 'flower' },
        { id: 103, name: 'BAKO BERRY (3.5g)', type: 'vault', price: 35.00, img: '/images/store/ca-flower-3.png', category: 'flower' },
        { id: 104, name: 'CLOUD CAKE (3.5g)', type: 'vault', price: 35.00, img: '/images/store/ca-flower-4.png', category: 'flower' },
        { id: 105, name: 'LEMON FUEL (3.5g)', type: 'vault', price: 25.00, img: '/images/store/ca-flower-5.png', category: 'flower' },
        { id: 106, name: 'SATIVA SUNRISE (3.5g)', type: 'vault', price: 25.00, img: '/images/store/ca-flower-6.png', category: 'flower' },
        { id: 107, name: 'BUDGET SHAKE (7g)', type: 'vault', price: 15.00, img: '/images/store/ca-flower-7.png', category: 'flower' },
        { id: 108, name: 'SINGLE PRE-ROLL', type: 'vault', price: 10.00, img: '/images/store/ca-flower-8.png', category: 'flower' },
        
        // Wax (8 spots: mix of budgets, mid, premium)
        { id: 201, name: 'PREMIUM ROSIN - 1g', type: 'vault', price: 120.00, img: '/images/store/ca-wax-1.png', category: 'wax' },
        { id: 202, name: 'HGM LIVE RESIN - 1g', type: 'vault', price: 60.00, img: '/images/store/ca-wax-2.png', category: 'wax' },
        { id: 203, name: 'DIAMONDS & SAUCE - 1g', type: 'vault', price: 40.00, img: '/images/store/ca-wax-3.png', category: 'wax' },
        { id: 204, name: 'BHO SHATTER - 1g', type: 'vault', price: 20.00, img: '/images/store/ca-wax-4.png', category: 'wax' },
        { id: 205, name: 'BUDGET CRUMBLE - 1g', type: 'vault', price: 10.00, img: '/images/store/ca-wax-5.png', category: 'wax' },
        { id: 206, name: 'CAVE LIVE SUGAR', type: 'vault', price: 40.00, img: '/images/store/ca-wax-6-8.png', category: 'wax' },
        { id: 207, name: 'BADOO BADDER', type: 'vault', price: 35.00, img: '/images/store/ca-wax-6-8.png', category: 'wax' },
        { id: 208, name: 'HGM BULK JAR - 3.5g', type: 'vault', price: 100.00, img: '/images/store/ca-wax-6-8.png', category: 'wax' },
        
        // Disposables (8 spots)
        { id: 301, name: 'MUHA MEDS DISPOSABLE', type: 'vault', price: 30.00, img: '/images/store/ca-disp-1.png', category: 'disposables' },
        { id: 302, name: 'ACES DISPOSABLE', type: 'vault', price: 30.00, img: '/images/store/ca-disp-2.png', category: 'disposables' },
        { id: 303, name: 'BOUTIQUE SWITCHES', type: 'vault', price: 35.00, img: '/images/store/ca-disp-3.png', category: 'disposables' },
        { id: 304, name: 'GENERIC HYBRID VAPE', type: 'vault', price: 25.00, img: '/images/store/ca-disp-4.png', category: 'disposables' },
        { id: 305, name: 'GENERIC SATIVA VAPE', type: 'vault', price: 25.00, img: '/images/store/ca-disp-5.png', category: 'disposables' },
        { id: 306, name: 'GENERIC INDICA VAPE', type: 'vault', price: 25.00, img: '/images/store/ca-disp-6.png', category: 'disposables' },
        { id: 307, name: 'PREMIUM VAPE POD', type: 'vault', price: 45.00, img: '/images/store/ca-disp-7-8.png', category: 'disposables' },
        { id: 308, name: 'LIVE RESIN DISPO', type: 'vault', price: 50.00, img: '/images/store/ca-disp-7-8.png', category: 'disposables' },
        
        // Edibles (8 spots)
        { id: 401, name: 'HGM GUMMIES - 100mg', type: 'vault', price: 20.00, img: '/images/store/ca-edible-1.png', category: 'edibles' },
        { id: 402, name: 'CLOUD AVE BROWNIES', type: 'vault', price: 25.00, img: '/images/store/ca-edible-2.png', category: 'edibles' },
        { id: 403, name: 'SOUR RINGS - 500mg', type: 'vault', price: 35.00, img: '/images/store/ca-edible-3.png', category: 'edibles' },
        { id: 404, name: 'BAKO BAR - DARK CHOC', type: 'vault', price: 22.00, img: '/images/store/ca-edible-1.png', category: 'edibles' },
        { id: 405, name: 'NEON PEACH RINGS', type: 'vault', price: 18.00, img: '/images/store/ca-edible-2.png', category: 'edibles' },
        { id: 406, name: 'CLOUD LIPS GUMMIES', type: 'vault', price: 15.00, img: '/images/store/ca-edible-1.png', category: 'edibles' },
        { id: 407, name: 'HIGH DOSE SYRUP', type: 'vault', price: 40.00, img: '/images/store/ca-edible-3.png', category: 'edibles' },
        { id: 408, name: 'INFUSED HONEY STICK', type: 'vault', price: 10.00, img: '/images/store/ca-edible-2.png', category: 'edibles' },
    ]
};

// --- BACKGROUND ENGINE (The Clouds) ---
function startParticles() {
    if (!document.getElementById("tsparticles")) return;
    tsParticles.load("tsparticles", {
        fpsLimit: 60,
        interactivity: {
            events: {
                onClick: { enable: true, mode: "push" }, // Click to add a flower
                onHover: { 
                    enable: true, 
                    mode: "repulse" // Flowers float away from mouse
                },
                resize: true,
            },
            modes: {
                push: { quantity: 1 },
                repulse: { distance: 100, duration: 0.4 },
            },
        },
        particles: {
            shape: {
                type: "image",
                image: [
                    { src: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='15' r='15' fill='%23FF007F'/><circle cx='85' cy='50' r='15' fill='%23FF007F'/><circle cx='50' cy='85' r='15' fill='%23FF007F'/><circle cx='15' cy='50' r='15' fill='%23FF007F'/><circle cx='25' cy='25' r='15' fill='%23FF007F'/><circle cx='75' cy='25' r='15' fill='%23FF007F'/><circle cx='25' cy='75' r='15' fill='%23FF007F'/><circle cx='75' cy='75' r='15' fill='%23FF007F'/><circle cx='50' cy='50' r='20' fill='%23F7FF00'/><circle cx='43' cy='45' r='3' fill='black'/><circle cx='57' cy='45' r='3' fill='black'/><path d='M40 55 Q 50 65 60 55' stroke='black' stroke-width='3' fill='none'/></svg>", width: 100, height: 100 },
                    { src: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='15' r='15' fill='%2339FF14'/><circle cx='85' cy='50' r='15' fill='%2339FF14'/><circle cx='50' cy='85' r='15' fill='%2339FF14'/><circle cx='15' cy='50' r='15' fill='%2339FF14'/><circle cx='25' cy='25' r='15' fill='%2339FF14'/><circle cx='75' cy='25' r='15' fill='%2339FF14'/><circle cx='25' cy='75' r='15' fill='%2339FF14'/><circle cx='75' cy='75' r='15' fill='%2339FF14'/><circle cx='50' cy='50' r='20' fill='%23FF007F'/><circle cx='43' cy='45' r='3' fill='black'/><circle cx='57' cy='45' r='3' fill='black'/><path d='M40 55 Q 50 65 60 55' stroke='black' stroke-width='3' fill='none'/></svg>", width: 100, height: 100 },
                    { src: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='15' r='15' fill='%2300FFFF'/><circle cx='85' cy='50' r='15' fill='%2300FFFF'/><circle cx='50' cy='85' r='15' fill='%2300FFFF'/><circle cx='15' cy='50' r='15' fill='%2300FFFF'/><circle cx='25' cy='25' r='15' fill='%2300FFFF'/><circle cx='75' cy='25' r='15' fill='%2300FFFF'/><circle cx='25' cy='75' r='15' fill='%2300FFFF'/><circle cx='75' cy='75' r='15' fill='%2300FFFF'/><circle cx='50' cy='50' r='20' fill='%23F7FF00'/><circle cx='43' cy='45' r='3' fill='black'/><circle cx='57' cy='45' r='3' fill='black'/><path d='M40 55 Q 50 65 60 55' stroke='black' stroke-width='3' fill='none'/></svg>", width: 100, height: 100 }
                ]
            },
            color: { value: "#ffffff" },
            move: {
                enable: true,
                direction: "none",
                outModes: { default: "out" }, 
                random: true,
                speed: 1, 
                straight: false,
            },
            number: {
                density: { enable: true, area: 800 },
                value: 20, 
            },
            opacity: {
                value: { min: 0.2, max: 0.8 }, 
                animation: {
                    enable: true,
                    speed: 0.5,
                    sync: false
                }
            },
            size: {
                value: { min: 8, max: 25 }, 
            },
            rotate: { 
                value: { min: 0, max: 360 },
                animation: {
                    enable: true,
                    speed: 2,
                    sync: false
                }
            }
        },
        detectRetina: true,
    });
}

// --- STORE UI LOGIC ---
function renderProducts(type, category = 'all') {
    const list = productData[type];
    const filtered = category === 'all' ? list : list.filter(p => p.category === category);
    
    // Setup target ID
    let targetID = type === 'lifestyle' ? 'lifestyle-grid' : 'vault-grid';
    
    const container = document.getElementById(targetID);
    if (!container) return;
    
    container.innerHTML = filtered.map(p => {
        return `
            <div class="product-card glass">
                <div class="product-img-wrapper">
                     <img src="${p.img}" alt="${p.name}" class="product-img" onerror="this.src='/logo1.png'">
                </div>
                <div class="product-info">
                    <span class="product-category">${p.category}</span>
                    <h3 class="product-name">${p.name}</h3>
                    <div class="product-details">
                        ${type === 'vault' ? '<p class="desc">High-performance carefully selected stock. Call for current availability and rotation.</p>' : ''}
                        <span class="product-price">$${p.price.toFixed(2)}</span>
                    </div>
                    <div class="fulfillment">
                        ${p.type === 'vault' 
                            ? '<span class="badge">PICKUP</span> <span class="badge">LOCAL DELIVERY</span>' 
                            : '<span class="badge">NATIONWIDE DELIVERY</span>'}
                    </div>
                </div>
                <button class="add-to-cart ${type === 'vault' ? 'call-btn' : ''}" data-id="${p.id}">
                    ${type === 'vault' ? 'CALL TO RESERVE' : 'ADD TO CART'}
                </button>
            </div>
        `;
    }).join('');

    // Attach cart events
    container.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', (e) => {
            if(btn.classList.contains('call-btn')) {
                window.location.href = "/contact.html";
                return;
            }
            const id = parseInt(e.target.dataset.id);
            const item = productData[type].find(p => p.id === id);
            addToCart(item);
            
            // Pop anim
            gsap.fromTo(e.target, 
                { scale: 0.9 }, 
                { scale: 1, duration: 0.3, ease: "elastic.out(1, 0.3)" }
            );
        });
    });

    // Staggered animate-in for product cards when rendering
    gsap.fromTo(container.querySelectorAll('.product-card'),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: "back.out(1.2)", clearProps: "all" }
    );
}

function renderTopSellers() {
    const allProducts = [...productData.lifestyle, ...productData.vault];
    const topSellers = allProducts.filter(p => p.isTopSeller).slice(0, 3);
    
    const container = document.getElementById('top-sellers-grid');
    if(!container) return;

    container.innerHTML = topSellers.map(p => {
        return `
            <div class="product-card glass">
                <div class="product-img-wrapper">
                     <img src="${p.img}" alt="${p.name}" class="product-img" onerror="this.src='/logo1.png'">
                </div>
                <div class="product-info">
                    <span class="product-category">TOP SELLER - ${p.category}</span>
                    <h3 class="product-name">${p.name}</h3>
                </div>
                <button class="add-to-cart" onclick="document.querySelector('[data-tab=\\'${p.type}\\']').click()">VIEW IN STORE</button>
            </div>
        `;
    }).join('');
}

function initStore() {
    renderProducts('lifestyle', 'all');
    renderProducts('vault', 'all');
    renderTopSellers();
    ecommerce.init();
    
    // Main Tab switching
    document.querySelectorAll('.nav-btn, .footer-links a').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const target = btn.dataset.tab || btn.getAttribute('href')?.replace('.html', '').replace('/', '');
            
            // Check if it's a tab link (not an external link)
            const possibleTabs = ['hero', 'lifestyle', 'vault', 'about', 'faq', 'contact', 'members', 'cart', 'checkout'];
            if (!possibleTabs.includes(target)) return;

            e.preventDefault();
            
            if (target === 'cart') {
                toggleCart(true);
                ecommerce.showSignupPrompt();
                return;
            }
            
            if (target === 'vault' && !state.isAgeVerified) {
                showAgeGate();
                return;
            }
            
            switchTab(target);
        });
    });

    // Logo returns home
    const navLogo = document.getElementById('nav-logo');
    if (navLogo) {
        navLogo.addEventListener('click', () => {
            switchTab('hero');
        });
    }

    // Pill Category filtering
    document.querySelectorAll('.pill-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const cat = btn.dataset.cat;
            // find which section we are in
            const section = btn.closest('.tab-content').id;
            
            // Update UI active state
            btn.parentElement.querySelectorAll('.pill-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Render
            renderProducts(section, cat);
        });
    });

    // Age Gate
    const ageConfirm = document.getElementById('age-confirm');
    const ageDeny = document.getElementById('age-deny');
    if (ageConfirm) {
        ageConfirm.addEventListener('click', () => {
            state.isAgeVerified = true;
            hideAgeGate();
            switchTab('vault');
        });
    }

    if (ageDeny) {
        ageDeny.addEventListener('click', () => {
            window.location.href = 'https://google.com';
        });
    }

    // Splash Screen Entry
    const enterBtn = document.getElementById('enter-site-btn');
    if (enterBtn) {
        enterBtn.addEventListener('click', () => {
            document.getElementById('splash-screen').classList.add('hidden');
            document.getElementById('app').classList.remove('hidden');
        });
    }

    // Cart events
    const closeCartBtn = document.getElementById('close-cart');
    if (closeCartBtn) {
        closeCartBtn.addEventListener('click', () => toggleCart(false));
    }
    
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            toggleCart(false);
            switchTab('checkout');
        });
    }
    
    // Static Cart Handler (for about/faq/contact pages)
    const openCartStatic = document.getElementById('open-cart-static');
    if (openCartStatic) {
        openCartStatic.addEventListener('click', () => toggleCart(true));
    }
}

function switchTab(tabId) {
    if (tabId === 'cart') return; // Handled separately
    
    state.activeTab = tabId;
    document.querySelectorAll('.tab-content').forEach(section => {
        if (section.id === tabId) {
            section.classList.add('active');
            gsap.fromTo(section, 
                { opacity: 0, y: 30 }, 
                { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
            );
        } else {
            section.classList.remove('active');
        }
    });

    // Update nav buttons visually
    document.querySelectorAll('.nav-btn').forEach(btn => {
        if (btn.dataset.tab === tabId) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    if (tabId === 'checkout') {
        updateCheckoutUI();
    }
}

function updateCheckoutUI() {
    const container = document.getElementById('checkout-items');
    if (!container) return;
    
    container.innerHTML = state.cart.map(item => `
        <div class="checkout-item">
            <span>${item.name}</span>
            <span>$${item.price.toFixed(2)}</span>
        </div>
    `).join('');
    
    const total = state.cart.reduce((sum, item) => sum + item.price, 0);
    document.getElementById('checkout-total').innerText = `$${total.toFixed(2)}`;
}

function showAgeGate() {
    const gate = document.getElementById('age-gate');
    gate.classList.remove('hidden');
}

function hideAgeGate() {
    const gate = document.getElementById('age-gate');
    gate.classList.add('hidden');
}

// --- CART LOGIC ---
function addToCart(item) {
    state.cart.push(item);
    updateCartUI();
}

function toggleCart(show) {
    const drawer = document.getElementById('cart-drawer');
    if (show) {
        drawer.classList.remove('hidden');
        gsap.fromTo('.cart-content', 
            { x: '100%'}, 
            { x: '0%', duration: 0.4, ease: "power3.out" }
        );
    } else {
        gsap.to('.cart-content', {
            x: '100%', 
            duration: 0.3, 
            onComplete: () => drawer.classList.add('hidden')
        });
    }
}

function updateCartUI() {
    document.getElementById('cart-count').innerText = state.cart.length;
    
    const container = document.getElementById('cart-items');
    container.innerHTML = state.cart.map((item, index) => `
        <div class="cart-item">
            <span>${item.name}</span>
            <span>$${item.price.toFixed(2)}</span>
            <button class="remove-btn" onclick="window.removeFromCart(${index})">X</button>
        </div>
    `).join('');

    const total = state.cart.reduce((sum, item) => sum + item.price, 0);
    document.getElementById('cart-total').innerText = `TOTAL: $${total.toFixed(2)}`;
    
    // Check if user is logged in, if not show prompt
    ecommerce.showSignupPrompt();
}

window.removeFromCart = (index) => {
    state.cart.splice(index, 1);
    updateCartUI();
};

function initCookieBanner() {
    const bar = document.getElementById('cookie-banner');
    const btn = document.getElementById('cookie-dismiss');
    if (!bar || !btn) return;

    if (localStorage.getItem('cloud-ave-cookie-consent') === '1') {
        return;
    }
    bar.hidden = false;

    btn.addEventListener('click', () => {
        localStorage.setItem('cloud-ave-cookie-consent', '1');
        bar.hidden = true;
    });
}

function initEliteInteractions() {
    // 1. ScrollTrigger Physics for Core Sections
    gsap.utils.toArray('.wow-card, .how-step, .hero-stat, .info-card, .status-box').forEach(el => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            y: 50,
            opacity: 0,
            duration: 0.6,
            ease: "back.out(1.2)"
        });
    });

    // 2. Velocity-Linked Marquee Physics - FIXED & SLOWED
    const marquee = document.querySelector('.marquee-track');
    if (marquee) {
        marquee.style.animation = 'none'; // disable raw CSS anim
        
        let marqueeTween = gsap.to(marquee, {
            xPercent: -50, // Move 50% left to loop
            repeat: -1,
            duration: 40, // SLOWER (was 20)
            ease: "none"
        }).timeScale(-1); // Reverse to move Left-to-Right

        let lastScrollTop = 0;
        window.addEventListener('scroll', () => {
            let st = window.pageYOffset || document.documentElement.scrollTop;
            if (st > lastScrollTop) {
                // downscroll -> slightly speed up
                gsap.to(marqueeTween, { timeScale: -1.5, duration: 0.5 });
            } else if (st < lastScrollTop) {
                // upscroll -> keep direction, maybe just slight jitter fix
                gsap.to(marqueeTween, { timeScale: -1, duration: 0.5 });
            }
            lastScrollTop = st <= 0 ? 0 : st;
            
            // Decelerate back to normal idle slowly
            clearTimeout(window.marqueeTimeout);
            window.marqueeTimeout = setTimeout(() => {
                gsap.to(marqueeTween, { timeScale: -1, duration: 1.2, ease: "power2.out" });
            }, 150);
        });
    }

    // 3. Magnetic Magnetic Buttons Experience
    document.querySelectorAll('.nav-btn, .gate-btn, .cta-btn').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            // Calculate distance from center of button
            const x = (e.clientX - rect.left) - rect.width / 2;
            const y = (e.clientY - rect.top) - rect.height / 2;
            
            // Pull the button slightly towards cursor
            gsap.to(btn, {
                x: x * 0.25,
                y: y * 0.25,
                duration: 0.4,
                ease: "power2.out"
            });
        });
        
        // Snap back when leaving
        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                x: 0,
                y: 0,
                duration: 0.7,
                ease: "elastic.out(1, 0.3)"
            });
        });
    });
    
    // 4. Seamless Page Load Transitions (No Blank White Skips)
    // Enter Sequence
    gsap.fromTo('#app', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', clearProps: 'all' });
    
    // Intercept clicks to internal routing
    document.querySelectorAll('a').forEach(a => {
        if(a.hostname === window.location.hostname && !a.href.includes('#') && a.target !== '_blank') {
            a.addEventListener('click', (e) => {
                e.preventDefault();
                const destination = a.href;
                gsap.to('#app', {
                    opacity: 0,
                    y: -15,
                    duration: 0.35,
                    ease: 'power2.in',
                    onComplete: () => {
                        window.location.href = destination;
                    }
                });
            });
        }
    });
}

// Initialize
initStore();
initCookieBanner();
initEliteInteractions();
