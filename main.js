import * as PIXI from 'pixi.js';
import gsap from 'gsap';

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
                    { src: "https://i.imgur.com/8Qh1X6w.png", width: 100, height: 100 },
                    { src: "https://i.imgur.com/7SjL7sY.png", width: 100, height: 100 },
                    { src: "https://i.imgur.com/z6bV5R2.png", width: 100, height: 100 }
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
                window.location.href = "tel:6615011881";
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

// Initialize
initStore();
