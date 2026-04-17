import * as PIXI from 'pixi.js';
import { gsap } from 'gsap';

// Configuration & State
const state = {
    isAgeVerified: false,
    activeTab: 'lifestyle',
    cart: [],
    products: [
        // Lifestyle Items
        { id: 1, name: 'CLOUDS BLUE BEANIE', type: 'lifestyle', price: 29.99, img: '/images/store/ca-beanie-blue.png', category: 'Apparel' },
        { id: 2, name: 'NAVY TEE', type: 'lifestyle', price: 34.99, img: '/images/store/ca-tee-navy.png', category: 'Apparel' },
        { id: 3, name: 'PINK TEE', type: 'lifestyle', price: 34.99, img: '/images/store/ca-tee-pink.png', category: 'Apparel' },
        { id: 4, name: 'RED TEE', type: 'lifestyle', price: 34.99, img: '/images/store/ca-tee-red.png', category: 'Apparel' },
        { id: 5, name: 'ROYAL BLUE TEE', type: 'lifestyle', price: 34.99, img: '/images/store/ca-tee-royal-blue.png', category: 'Apparel' },
        { id: 6, name: 'YELLOW TEE', type: 'lifestyle', price: 34.99, img: '/images/store/ca-tee-yellow.png', category: 'Apparel' },
        { id: 7, name: 'TRUCKER HAT', type: 'lifestyle', price: 39.99, img: '/images/store/ca-hat-trucker.png', category: 'Apparel' },
        { id: 8, name: 'COMBO BLUE SET', type: 'lifestyle', price: 59.99, img: '/images/store/ca-combo-blue-tee-beanie.png', category: 'Bundle' },
        { id: 9, name: 'COMBO PINK SET', type: 'lifestyle', price: 59.99, img: '/images/store/ca-combo-pink-tee-blue-hat.png', category: 'Bundle' },
        { id: 10, name: 'TRAY', type: 'lifestyle', price: 19.99, img: '/images/store/ca-tray.png', category: 'Accessory' },
        { id: 11, name: 'GRINDER', type: 'lifestyle', price: 24.99, img: '/images/store/ca-grinder.png', category: 'Accessory' },
        { id: 12, name: 'GLASS PIPE', type: 'lifestyle', price: 14.99, img: '/images/store/ca-glass-pipe.png', category: 'Accessory' },
        { id: 13, name: 'CONES (3PK)', type: 'lifestyle', price: 4.99, img: '/images/store/ca-cones.png', category: 'Accessory' },
        { id: 14, name: 'ONE HITTER', type: 'lifestyle', price: 9.99, img: '/images/store/ca-one-hitter.png', category: 'Accessory' },
        { id: 21, name: 'HARD CASE', type: 'lifestyle', price: 15.99, img: '/images/store/ca-case.png', category: 'Accessory' },
        
        // Cannabis Items
        { id: 101, name: 'PREMIUM FLOWER', type: 'cannabis', price: 45.00, img: '/images/store/ca-menu-flower.png', category: 'Flower' },
        { id: 102, name: 'DISPOSABLE PEN', type: 'cannabis', price: 35.00, img: '/images/store/ca-menu-disposable.png', category: 'Vape' },
        { id: 103, name: 'LIVE RESIN WAX', type: 'cannabis', price: 40.00, img: '/images/store/ca-menu-wax.png', category: 'Extract' },
        { id: 104, name: 'GUMMY EDIBLES', type: 'cannabis', price: 25.00, img: '/images/store/ca-menu-edibles.png', category: 'Edible' },
        { id: 105, name: '510 BATTERY A', type: 'cannabis', price: 20.00, img: '/images/store/ca-battery-510-a.png', category: 'Hardware' },
        { id: 106, name: '510 BATTERY B', type: 'cannabis', price: 20.00, img: '/images/store/ca-battery-510-b.png', category: 'Hardware' },
        { id: 107, name: 'C.A. VAPE PEN', type: 'cannabis', price: 30.00, img: '/images/store/ca-wax-pen.png', category: 'Vape' },
    ]
};

// --- PIXI.JS PARTICLE SYSTEM ---
class ParticleSystem {
    constructor() {
        this.app = new PIXI.Application({
            view: document.getElementById('bg-canvas'),
            width: window.innerWidth,
            height: window.innerHeight,
            backgroundAlpha: 0,
            resizeTo: window
        });

        this.particles = [];
        this.particleCount = 50;
        this.textures = [];
        this.mouse = { x: 0, y: 0 };

        this.init();
    }

    async init() {
        // Load textures
        const logoTexture = await PIXI.Assets.load('/logo1.png');
        this.textures.push(logoTexture);

        // Layers for parallax
        this.layers = [
            { count: 40, speedScale: 0.5, blur: 4, scale: 0.04 },  // Back
            { count: 30, speedScale: 1.0, blur: 0, scale: 0.08 },  // Mid
            { count: 20, speedScale: 2.0, blur: 0, scale: 0.15 }   // Front
        ];

        this.layers.forEach(layer => {
            for (let i = 0; i < layer.count; i++) {
                this.createParticle(layer);
            }
        });

        this.app.ticker.add(() => this.update());
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
    }

    createParticle(layer) {
        const sprite = new PIXI.Sprite(this.textures[0]);
        sprite.anchor.set(0.5);
        
        // Random placement
        sprite.x = Math.random() * this.app.screen.width;
        sprite.y = Math.random() * this.app.screen.height;
        
        // Neo-Pop tinting
        const colors = [0xFF007F, 0xF7FF00, 0x39FF14, 0x00FFFF];
        sprite.tint = colors[Math.floor(Math.random() * colors.length)];
        
        // Superflat scaling based on layer
        sprite.scale.set(layer.scale + (Math.random() * 0.02));

        if (layer.blur > 0) {
            const blurFilter = new PIXI.BlurFilter();
            blurFilter.blur = layer.blur;
            sprite.filters = [blurFilter];
        }
        
        const particle = {
            sprite,
            vx: (Math.random() - 0.5) * layer.speedScale * 2,
            vy: (Math.random() - 0.5) * layer.speedScale * 2,
            rot: (Math.random() - 0.5) * 0.02,
            speedScale: layer.speedScale
        };

        this.app.stage.addChild(sprite);
        this.particles.push(particle);
    }

    update() {
        this.particles.forEach(p => {
            p.sprite.x += p.vx;
            p.sprite.y += p.vy;
            p.sprite.rotation += p.rot;

            // Mouse Repulsion
            const dx = p.sprite.x - this.mouse.x;
            const dy = p.sprite.y - this.mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < 150) {
                const angle = Math.atan2(dy, dx);
                const force = (150 - dist) / 150;
                p.sprite.x += Math.cos(angle) * force * 10 * p.speedScale;
                p.sprite.y += Math.sin(angle) * force * 10 * p.speedScale;
            }

            // Wrap around
            if (p.sprite.x < -100) p.sprite.x = this.app.screen.width + 100;
            if (p.sprite.x > this.app.screen.width + 100) p.sprite.x = -100;
            if (p.sprite.y < -100) p.sprite.y = this.app.screen.height + 100;
            if (p.sprite.y > this.app.screen.height + 100) p.sprite.y = -100;

            // Optional: Color rotation for "Controlled Chaos"
            p.sprite.tint = this.updateHue(p.sprite.tint, 0.001); 
        });
    }

    updateHue(hex, amount) {
        // Simple hue shift in hex
        let color = PIXI.Color.shared.setValue(hex);
        let hsla = color.toHsl();
        hsla.h = (hsla.h + amount) % 1;
        color.setValues(hsla);
        return color.toNumber();
    }
}

// --- STORE UI LOGIC ---
function initStore() {
    renderProducts('lifestyle');
    renderProducts('cannabis');
    
    // Tab switching
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const target = btn.dataset.tab;
            if (target === 'cart') {
                toggleCart(true);
                return;
            }
            
            if (target === 'cannabis' && !state.isAgeVerified) {
                showAgeGate();
                return;
            }
            
            switchTab(target);
        });
    });

    // Hero CTA
    document.querySelector('.cta-btn').addEventListener('click', () => {
        switchTab('lifestyle');
    });

    // Age Gate
    document.getElementById('age-confirm').addEventListener('click', () => {
        state.isAgeVerified = true;
        hideAgeGate();
        switchTab('cannabis');
    });

    document.getElementById('age-deny').addEventListener('click', () => {
        window.location.href = 'https://google.com';
    });

    // Cart events
    document.getElementById('close-cart').addEventListener('click', () => toggleCart(false));
}

function switchTab(tabId) {
    state.activeTab = tabId;
    
    // Update Nav
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tabId);
    });

    // Update Sections
    document.querySelectorAll('.tab-content').forEach(section => {
        section.classList.toggle('active', section.id === tabId);
    });

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderProducts(type) {
    const container = document.getElementById(type);
    if (!container) return;
    
    const items = state.products.filter(p => p.type === type);
    
    container.innerHTML = items.map(p => `
        <div class="product-card">
            <div class="product-img-wrapper">
                <img src="${p.img}" alt="${p.name}" class="product-img">
            </div>
            <div class="product-info">
                <span class="product-category">${p.category}</span>
                <h3 class="product-name">${p.name}</h3>
                <span class="product-price">$${p.price.toFixed(2)}</span>
                <div class="fulfillment">
                    ${p.type === 'cannabis' 
                        ? '<span class="badge">PICKUP</span> <span class="badge">LOCAL DELIVERY</span>' 
                        : '<span class="badge">NATIONWIDE DELIVERY</span>'}
                </div>
            </div>
            <button class="add-to-cart" onclick="addToCart(${p.id})">ADD TO BAG</button>
        </div>
    `).join('');
}

function showAgeGate() {
    document.getElementById('age-gate').classList.remove('hidden');
}

function hideAgeGate() {
    document.getElementById('age-gate').classList.add('hidden');
}

function toggleCart(show) {
    document.getElementById('cart-drawer').classList.toggle('hidden', !show);
}

// Expose to window for inline onclick
window.addToCart = (id) => {
    const product = state.products.find(p => p.id === id);
    state.cart.push(product);
    updateCart();
    
    // Bounce animation on cart button
    const cartBtn = document.querySelector('[data-tab="cart"]');
    gsap.to(cartBtn, { scale: 1.2, duration: 0.1, yoyo: true, repeat: 1 });
};

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartBtn = document.querySelector('[data-tab="cart"]');
    
    cartBtn.innerText = `CART (${state.cart.length})`;
    
    if (state.cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align:center; padding: 20px;">Your bag is empty.</p>';
        cartTotal.innerText = 'TOTAL: $0.00';
        return;
    }
    
    const total = state.cart.reduce((sum, p) => sum + p.price, 0);
    cartTotal.innerText = `TOTAL: $${total.toFixed(2)}`;
    
    cartItems.innerHTML = state.cart.map((p, index) => `
        <div class="cart-item glass" style="display:flex; gap:15px; padding:10px; margin-bottom:10px; border-radius:10px;">
            <img src="${p.img}" style="width:60px; background:#fff; border-radius:5px;">
            <div style="flex:1">
                <h4 style="font-size:0.9rem">${p.name}</h4>
                <p>$${p.price.toFixed(2)}</p>
            </div>
            <button onclick="removeFromCart(${index})" style="background:none; border:none; color:#ff4444; cursor:pointer;">✕</button>
        </div>
    `).join('');
}

window.removeFromCart = (index) => {
    state.cart.splice(index, 1);
    updateCart();
};

// Initialize
new ParticleSystem();
initStore();

// Psychologically driven: occasional "bloom" of flowers
setInterval(() => {
    const text = document.querySelector('h1');
    gsap.to(text, { scale: 1.05, duration: 0.5, yoyo: true, repeat: 1, ease: "power2.inOut" });
}, 5000);
