import * as PIXI from 'pixi.js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
        { id: 1, name: 'HGM MONEY TREE TEE - PINK', type: 'lifestyle', price: 30.00, img: '/images/store/ca-tee-pink.png', category: 'tees', isTopSeller: true },
        { id: 2, name: 'HGM MONEY TREE TEE - YELLOW', type: 'lifestyle', price: 30.00, img: '/images/store/ca-tee-yellow.png', category: 'tees' },
        { id: 3, name: 'HGM MONEY TREE TEE - NAVY', type: 'lifestyle', price: 30.00, img: '/images/store/ca-tee-navy.png', category: 'tees' },
        { id: 4, name: 'HGM TRUCKER HAT - SKY BLUE', type: 'lifestyle', price: 25.00, img: '/images/store/ca-hat-blue.png', category: 'hats' },
        { id: 5, name: 'HGM BEANIE - BLUE', type: 'lifestyle', price: 20.00, img: '/images/store/ca-beanie-blue.png', category: 'beanies', isTopSeller: true },
        { id: 6, name: 'HGM BLUE TEE + BLUE BEANIE', type: 'lifestyle', price: 45.00, img: '/images/store/ca-combo.png', category: 'combos' },
    ],
    vault: [
        { id: 101, name: 'HGM LEGENDS SERIES (JORDAN, KOBE...)', type: 'vault', price: 45.00, img: '/images/store/ca-menu-flower.png', category: 'flower', isTopSeller: true },
        { id: 102, name: 'PREMIUM DISPOSABLES (MUHAMMED, TRAP CITY...)', type: 'vault', price: 35.00, img: '/images/store/ca-menu-disposable.png', category: 'disposables' },
        { id: 103, name: 'LIVE RESIN WAX', type: 'vault', price: 40.00, img: '/images/store/ca-menu-wax.png', category: 'wax' },
        { id: 104, name: 'GUMMY EDIBLES', type: 'vault', price: 25.00, img: '/images/store/ca-menu-edibles.png', category: 'edibles' },
        { id: 105, name: 'HGM DESSERT SERIES (ICE CREAM, FRITTER)', type: 'vault', price: 45.00, img: '/images/store/ca-menu-flower.png', category: 'flower' },
    ]
};

// --- BACKGROUND ENGINE (The Clouds) ---
function startParticles() {
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
    
    // Main Tab switching
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const target = btn.dataset.tab;
            if (!target) return; // external links like IG
            
            if (target === 'cart') {
                toggleCart(true);
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
    document.getElementById('age-confirm').addEventListener('click', () => {
        state.isAgeVerified = true;
        hideAgeGate();
        switchTab('vault');
    });

    document.getElementById('age-deny').addEventListener('click', () => {
        window.location.href = 'https://google.com';
    });

    // Splash Screen Entry
    document.getElementById('enter-site-btn').addEventListener('click', () => {
        document.getElementById('splash-screen').classList.add('hidden');
        document.getElementById('app').classList.remove('hidden');
        
        // Start background visual only when entered for performance
        startParticles();
    });

    // Cart events
    document.getElementById('close-cart').addEventListener('click', () => toggleCart(false));
}

function switchTab(tabId) {
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
        if (btn.dataset.tab === tabId && tabId !== 'cart') {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
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

    // 2. Velocity-Linked Marquee Physics
    const marquee = document.querySelector('.marquee-track');
    if (marquee) {
        marquee.style.animation = 'none'; // disable raw CSS anim
        
        let direction = -1; // -1 = Left (Forward), 1 = Right (Reverse)
        let marqueeTween = gsap.to(marquee, {
            xPercent: direction * 50,
            repeat: -1,
            duration: 20,
            ease: "none"
        }).timeScale(1);

        let lastScrollTop = 0;
        window.addEventListener('scroll', () => {
            let st = window.pageYOffset || document.documentElement.scrollTop;
            if (st > lastScrollTop) {
                // downscroll -> fast forward
                gsap.to(marqueeTween, { timeScale: 2.5, duration: 0.3 });
            } else if (st < lastScrollTop) {
                // upscroll -> reverse direction!
                gsap.to(marqueeTween, { timeScale: -2.5, duration: 0.3 });
            }
            lastScrollTop = st <= 0 ? 0 : st;
            
            // Decelerate back to normal idle slowly
            clearTimeout(window.marqueeTimeout);
            window.marqueeTimeout = setTimeout(() => {
                gsap.to(marqueeTween, { timeScale: direction, duration: 0.8, ease: "power2.out" });
            }, 100);
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
