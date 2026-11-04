/**
 * Bloom & Bliss – Premium Online Flower Boutique
 * Core JavaScript Logic
 * 
 * Features:
 * - Product catalog & category filtering
 * - Live search & sorting
 * - Full shopping cart with localStorage persistence
 * - Direct & Cart WhatsApp ordering integration
 * - Wedding varmala inquiry generator
 * - Responsive navigation, modals, and toasts
 */

// ============================================================================
// 1. Configuration & Constants
// ============================================================================
const WHATSAPP_NUMBER = "918871918488"; // Bloom & Bliss Official WhatsApp Number
const STORAGE_CART_KEY = "bloom_bliss_cart_data";

// ============================================================================
// 2. Product Catalog Data (12 Signature Products with Exact Image Matching)
// ============================================================================
const PRODUCTS = [
  {
    id: 1,
    name: "Red Rose Bouquet",
    category: "rose-bouquets",
    secondaryCategories: ["fresh-bouquets"],
    price: 799,
    originalPrice: 999,
    badge: "Bestseller",
    badgeType: "rose",
    description: "A beautiful hand-tied bouquet made entirely of fresh deep red Dutch roses with baby's breath and luxury blush wrapping.",
    image: "https://images.unsplash.com/photo-1518709779341-56cf4535e94b?auto=format&fit=crop&w=800&q=80",
    alt: "Hand-tied bouquet made entirely of fresh velvety red roses in luxury wrapping"
  },
  {
    id: 2,
    name: "Pink Rose Bouquet",
    category: "rose-bouquets",
    secondaryCategories: ["fresh-bouquets"],
    price: 899,
    originalPrice: 1099,
    badge: "Popular",
    badgeType: "rose",
    description: "A bouquet consisting of delicate pastel pink roses with elegant artisanal wrapping, symbolizing grace and heartfelt admiration.",
    image: "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=800&q=80",
    alt: "Fresh bouquet of pink roses with elegant wrapping and soft petals"
  },
  {
    id: 3,
    name: "White Lily Bouquet",
    category: "fresh-bouquets",
    secondaryCategories: [],
    price: 999,
    originalPrice: 1249,
    badge: "Premium",
    badgeType: "gold",
    description: "An actual bouquet of fresh fragrant white lilies with green leaves, expressing purity, peace, and timeless elegance.",
    image: "https://images.unsplash.com/photo-1790353209640-60fe54bfef01?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    alt: "Fresh hand-tied bouquet of blooming white lilies with natural green foliage"
  },
  {
    id: 4,
    name: "Mixed Flower Bouquet",
    category: "fresh-bouquets",
    secondaryCategories: [],
    price: 699,
    originalPrice: 849,
    badge: "Value Pick",
    badgeType: "rose",
    description: "A colorful mixed bouquet containing fresh roses, carnations, chrysanthemums, and seasonal garden flowers.",
    image: "https://images.unsplash.com/photo-1572454591674-2739f30d8c40?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    alt: "Colorful mixed flower bouquet with vibrant fresh roses, carnations and seasonal blooms"
  },
  {
    id: 5,
    name: "Wedding Red Rose Varmala",
    category: "wedding-varmala",
    secondaryCategories: ["flower-garlands"],
    price: 1499,
    originalPrice: 1899,
    badge: "Wedding Special",
    badgeType: "gold",
    description: "Two traditional Indian wedding garlands hand-threaded entirely with fresh crimson red roses, golden tissue accents, and pearl details.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFSYbbEoA3Oj7jUtDfIH0DdhNtyEyohQaTgHCaqUoA5cV0SnjQDvxQ7nY&s=10",
    alt: "Traditional Indian wedding red rose varmala garland made entirely of fresh red roses"
  },
  {
    id: 6,
    name: "White Rose Varmala",
    category: "wedding-varmala",
    secondaryCategories: ["flower-garlands"],
    price: 1799,
    originalPrice: 2199,
    badge: "Trending",
    badgeType: "gold",
    description: "Two elegant wedding garlands made with pristine white roses, gypsophila (baby's breath), and silver gota ribbons.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPjw5TUK620uMttDKBb74eU79ZxGORa1LUaubqpyU_1Urjy6km5hkbAw-1&s=10",
    alt: "Complete traditional Indian wedding white rose varmala garland"
  },
  {
    id: 7,
    name: "Yellow Marigold Varmala",
    category: "wedding-varmala",
    secondaryCategories: ["flower-garlands"],
    price: 999,
    originalPrice: 1299,
    badge: "Traditional",
    badgeType: "rose",
    description: "Traditional Indian wedding garlands made entirely of auspicious yellow and orange marigold flowers (genda phool).",
    image: "https://thursd.com/storage/media/72295/varmala-in-an-Indian-wedding.jpg",
    alt: "Traditional Indian wedding garlands made entirely of yellow and orange marigold flowers"
  },
  {
    id: 8,
    name: "Premium Wedding Varmala",
    category: "wedding-varmala",
    secondaryCategories: ["flower-garlands"],
    price: 2499,
    originalPrice: 2999,
    badge: "Royal Choice",
    badgeType: "gold",
    description: "Luxurious bridal and groom garlands featuring an opulent combination of fresh roses, orchids, and decorative pearls.",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Varmala%20ceremony.jpg?width=960",
    alt: "Opulent royal Indian wedding bridal and groom varmala ceremony garland arrangement"
  },
  {
    id: 9,
    name: "Flower Basket",
    category: "flower-baskets",
    secondaryCategories: ["fresh-bouquets"],
    price: 1299,
    originalPrice: 1599,
    badge: "Gift Favorite",
    badgeType: "rose",
    description: "A decorative artisan woven wicker basket abundantly filled with fresh colorful flowers and garden foliage.",
    image: "https://images.unsplash.com/photo-1604323990536-e5452c0507c1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    alt: "Decorative woven wicker basket filled with fresh colorful pastel flowers"
  },
  {
    id: 10,
    name: "Pink Carnation Bouquet",
    category: "fresh-bouquets",
    secondaryCategories: [],
    price: 849,
    originalPrice: 1049,
    badge: "Sweet Sentiment",
    badgeType: "rose",
    description: "A beautiful hand-tied bouquet made primarily of fresh ruffled pink carnations in elegant matte blush wrap.",
    image: "https://images.unsplash.com/photo-1497276236755-0f85ba99a126?auto=format&fit=crop&w=800&q=80",
    alt: "Fresh bouquet made primarily of soft pink ruffled carnations"
  },
  {
    id: 11,
    name: "Bridal Flower Garland",
    category: "flower-garlands",
    secondaryCategories: ["wedding-varmala"],
    price: 1999,
    originalPrice: 2399,
    badge: "Handcrafted",
    badgeType: "gold",
    description: "A beautiful traditional floral bridal hair garland (Gajra-style flower arrangement) woven with fragrant jasmine and rosebuds.",
    image: "https://images.pexels.com/photos/29492668/pexels-photo-29492668/free-photo-of-elegant-bride-in-ornate-pink-lehenga-with-floral-garlands.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "Traditional floral bridal hair garland and gajra flower arrangement for Indian bride"
  },
  {
    id: 12,
    name: "Custom Flower Arrangement",
    category: "customized-flowers",
    secondaryCategories: [],
    price: 1499,
    originalPrice: 1799,
    badge: "Custom Made",
    badgeType: "gold",
    description: "A professionally arranged combination of different fresh flowers, tailored to your requested colors, flowers, and occasion.",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80",
    alt: "Professionally arranged combination of different fresh flowers in a luxury centerpiece"
  }
];

// Wedding Varmala Specific Spotlight Items (Distinct from Catalog Products)
const VARMALA_SHOWCASE = [
  {
    name: "Red Rose Varmala",
    price: 1499,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYhbqZX6w1b8DDBd8E_O2TogjCI7dRC1h645aVXHkf_w&s=10",
    desc: "Complete traditional Indian wedding varmala made entirely of fresh red roses.",
    alt: "Complete traditional Indian wedding varmala made entirely of fresh red roses"
  },
  {
    name: "White Rose Varmala",
    price: 1799,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROIf2C58YBpdtDRZuQCzaCIStwicwX3RFznfFg70NFCw&s=10",
    desc: "Beautiful Indian bride wearing an elegant, clearly visible white rose wedding varmala.",
    alt: "Indian bride wearing an elegant white rose wedding varmala garland"
  },
  {
    name: "Yellow Marigold Varmala",
    price: 999,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkvwLIlXYyl4kAbdRBBABGhSNxUJ8rxyMnQKWt9ib02A&s=10",
    desc: "Clean product focus on a single auspicious yellow and orange marigold garland.",
    alt: "Single traditional yellow and orange marigold wedding varmala garland"
  },
  {
    name: "Pink & White Rose Varmala",
    price: 1899,
    image: "https://arpanflowers.com/wp-content/uploads/2024/11/Pink-And-Pitch-Rose-With-Babys-breath-Varmala.webp",
    desc: "Traditional wedding garland handcrafted with fresh blush pink and white roses.",
    alt: "Complete traditional wedding garland made with pink and white roses"
  },
  {
    name: "Premium Bridal Varmala",
    price: 2499,
    image: "https://images.pexels.com/photos/28120538/pexels-photo-28120538/free-photo-of-couple-on-varmala.jpeg?auto=compress&cs=tinysrgb&w=800",
    desc: "Regal bridal and groom garland arrangement styled with luxury roses and decorative pearls.",
    alt: "Luxurious royal Indian wedding bridal and groom garland arrangement"
  }
];

// ============================================================================
// 3. State Management
// ============================================================================
let cart = [];
let currentCategory = "all";
let searchQuery = "";
let currentSort = "featured";

// Temporary order state for direct single-product checkout
let checkoutItems = [];

// ============================================================================
// 4. Initialisation & DOM Ready
// ============================================================================
document.addEventListener("DOMContentLoaded", () => {
  loadCartFromStorage();
  renderProducts();
  renderVarmalaShowcase();
  setupNavigation();
  setupCategoryFilters();
  setupSearchAndSort();
  setupCartDrawer();
  setupCheckoutModal();
  setupScrollEffects();
  setupFloatingActions();
  setupContactForm();
});

// ============================================================================
// 5. Product Catalog Rendering & Filtering
// ============================================================================
function renderProducts() {
  const container = document.getElementById("productsGrid");
  if (!container) return;

  // Filter products by category and search
  let filtered = PRODUCTS.filter(product => {
    const matchesCategory = 
      currentCategory === "all" || 
      product.category === currentCategory || 
      product.secondaryCategories.includes(currentCategory);

    const matchesSearch = 
      searchQuery === "" ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // Sort products
  if (currentSort === "price-low") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (currentSort === "price-high") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (currentSort === "name-az") {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  }

  // Handle Empty State
  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="empty-products-state">
        <div class="empty-state-icon">🌸</div>
        <h3 class="empty-state-title">No Blooms Found</h3>
        <p class="empty-state-desc">We couldn't find any flowers matching "${escapeHtml(searchQuery)}". Try clearing your search or browsing another collection.</p>
        <button class="btn btn-secondary btn-sm" id="resetFiltersBtn">Reset All Filters</button>
      </div>
    `;
    const resetBtn = document.getElementById("resetFiltersBtn");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        currentCategory = "all";
        searchQuery = "";
        const searchInput = document.getElementById("shopSearchInput");
        if (searchInput) searchInput.value = "";
        document.querySelectorAll(".filter-tab").forEach(tab => {
          tab.classList.toggle("active", tab.dataset.category === "all");
        });
        renderProducts();
      });
    }
    return;
  }

  // Render product cards
  container.innerHTML = filtered.map(product => `
    <article class="product-card" data-id="${product.id}">
      <div class="product-image-container">
        <img 
          src="${product.image}" 
          alt="${escapeHtml(product.alt || product.name)}" 
          loading="lazy"
          onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1518709779341-56cf4535e94b?auto=format&fit=crop&w=800&q=80';"
        />
        ${product.badge ? `<span class="product-badge ${product.badgeType === 'gold' ? 'gold' : ''}">${product.badge}</span>` : ''}
      </div>

      <div class="product-content">
        <span class="product-category-tag">${formatCategoryTag(product.category)}</span>
        <h3 class="product-title">${escapeHtml(product.name)}</h3>
        <p class="product-description">${escapeHtml(product.description)}</p>

        <div class="product-price-row">
          <span class="product-price">₹${product.price.toLocaleString('en-IN')}</span>
          ${product.originalPrice ? `<span class="product-price-original">₹${product.originalPrice.toLocaleString('en-IN')}</span>` : ''}
        </div>

        <div class="product-actions">
          <button class="btn btn-card-cart" onclick="handleAddToCart(${product.id})">
            🛒 Add to Cart
          </button>
          <button class="btn btn-card-whatsapp" onclick="handleDirectWhatsAppOrder(${product.id})">
            💬 WhatsApp
          </button>
        </div>
      </div>
    </article>
  `).join("");
}

function formatCategoryTag(categorySlug) {
  const map = {
    "fresh-bouquets": "Fresh Bouquet",
    "wedding-varmala": "Wedding Varmala",
    "rose-bouquets": "Rose Collection",
    "flower-garlands": "Flower Garland",
    "flower-baskets": "Artisan Basket",
    "customized-flowers": "Bespoke Design"
  };
  return map[categorySlug] || "Bloom & Bliss";
}

// ============================================================================
// 6. Wedding Varmala Showcase Rendering
// ============================================================================
function renderVarmalaShowcase() {
  const container = document.getElementById("varmalaGrid");
  if (!container) return;

  container.innerHTML = VARMALA_SHOWCASE.map((item, index) => `
    <div class="varmala-card">
      <div class="varmala-img-box">
        <img 
          src="${item.image}" 
          alt="${escapeHtml(item.alt || item.name)}" 
          loading="lazy"
          onerror="this.onerror=null; this.src='https://images.pexels.com/photos/38259804/pexels-photo-38259804/free-photo-of-traditional-wedding-ceremony-with-floral-garland.jpeg?auto=compress&cs=tinysrgb&w=800';"
        />
      </div>
      <div class="varmala-details">
        <h4 class="varmala-title">${escapeHtml(item.name)}</h4>
        <div class="varmala-price">₹${item.price.toLocaleString('en-IN')}</div>
        <p style="font-size:0.75rem; color:var(--text-muted); margin-bottom:12px;">${item.desc}</p>
        <button class="btn btn-primary varmala-btn" onclick="inquireVarmalaItem('${escapeHtml(item.name)}', ${item.price})">
          Order on WhatsApp
        </button>
      </div>
    </div>
  `).join("");
}

// Inquire specific Varmala from dedicated showcase
window.inquireVarmalaItem = function(name, price) {
  const item = {
    name: name,
    price: price,
    quantity: 1
  };
  openCheckoutModal([item]);
};

// Customize Varmala consultation trigger
window.handleCustomizeVarmala = function() {
  const message = `Hello Bloom & Bliss!

I would like to inquire about customized wedding varmala for my wedding.

Could you please share the available designs, flower options, and pricing?

Thank you!`;

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
};

// ============================================================================
// 7. Category Filters & Search Controls
// ============================================================================
function setupCategoryFilters() {
  // Category tabs inside shop section
  const filterTabs = document.querySelectorAll(".filter-tab");
  filterTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      filterTabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      currentCategory = tab.dataset.category;
      renderProducts();
    });
  });

  // Category cards in top "Shop by Categories" section
  const categoryCards = document.querySelectorAll(".category-card");
  categoryCards.forEach(card => {
    card.addEventListener("click", () => {
      const targetCat = card.dataset.filterCategory;
      currentCategory = targetCat;

      // Update tabs UI
      filterTabs.forEach(tab => {
        tab.classList.toggle("active", tab.dataset.category === targetCat);
      });

      // Render filtered products
      renderProducts();

      // Smooth scroll to shop section
      const shopSection = document.getElementById("shop");
      if (shopSection) {
        const offset = 80;
        const targetPos = shopSection.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: targetPos, behavior: "smooth" });
      }
    });
  });
}

function setupSearchAndSort() {
  const searchInput = document.getElementById("shopSearchInput");
  const clearBtn = document.getElementById("searchClearBtn");
  const sortSelect = document.getElementById("sortSelect");

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value.trim();
      if (clearBtn) {
        clearBtn.classList.toggle("visible", searchQuery.length > 0);
      }
      renderProducts();
    });
  }

  if (clearBtn && searchInput) {
    clearBtn.addEventListener("click", () => {
      searchInput.value = "";
      searchQuery = "";
      clearBtn.classList.remove("visible");
      renderProducts();
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      currentSort = e.target.value;
      renderProducts();
    });
  }
}

// ============================================================================
// 8. Shopping Cart Logic (Vanilla JS & LocalStorage)
// ============================================================================
function loadCartFromStorage() {
  try {
    const saved = localStorage.getItem(STORAGE_CART_KEY);
    if (saved) {
      cart = JSON.parse(saved);
    }
  } catch (err) {
    console.error("Could not load cart from localStorage", err);
    cart = [];
  }
  updateCartBadge();
  renderCartDrawer();
}

function saveCartToStorage() {
  try {
    localStorage.setItem(STORAGE_CART_KEY, JSON.stringify(cart));
  } catch (err) {
    console.error("Could not save cart to localStorage", err);
  }
  updateCartBadge();
  renderCartDrawer();
}

function updateCartBadge() {
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const badge = document.getElementById("navCartBadge");
  if (badge) {
    badge.textContent = totalCount;
    badge.classList.remove("bump");
    void badge.offsetWidth; // Trigger reflow
    badge.classList.add("bump");
  }
}

window.handleAddToCart = function(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const existingIndex = cart.findIndex(item => item.id === productId);
  if (existingIndex > -1) {
    cart[existingIndex].quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  }

  saveCartToStorage();
  showToast(`Added "${product.name}" to your flower basket! 🌸`, "success");
};

window.handleUpdateCartQty = function(productId, delta) {
  const index = cart.findIndex(item => item.id === productId);
  if (index === -1) return;

  cart[index].quantity += delta;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
    showToast("Item removed from basket.", "info");
  }

  saveCartToStorage();
};

window.handleRemoveCartItem = function(productId) {
  const index = cart.findIndex(item => item.id === productId);
  if (index > -1) {
    const name = cart[index].name;
    cart.splice(index, 1);
    saveCartToStorage();
    showToast(`Removed "${name}" from basket.`, "info");
  }
};

window.handleClearCart = function() {
  if (cart.length === 0) return;
  if (confirm("Are you sure you want to empty your flower basket?")) {
    cart = [];
    saveCartToStorage();
    showToast("Your flower basket has been cleared.", "info");
  }
};

function renderCartDrawer() {
  const cartBody = document.getElementById("cartDrawerBody");
  const cartFooter = document.getElementById("cartDrawerFooter");
  const cartItemCountLabel = document.getElementById("cartDrawerCount");

  if (!cartBody || !cartFooter) return;

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (cartItemCountLabel) {
    cartItemCountLabel.textContent = `(${totalItems} ${totalItems === 1 ? 'item' : 'items'})`;
  }

  if (cart.length === 0) {
    cartBody.innerHTML = `
      <div class="cart-empty-view">
        <div class="cart-empty-icon">💐</div>
        <h4 class="cart-empty-title">Your Flower Basket is Empty</h4>
        <p class="cart-empty-text">Add some fresh blooms or wedding varmalas to fill your special day with fragrance.</p>
        <button class="btn btn-primary" onclick="closeCartDrawer(); scrollToSection('shop');">
          Continue Shopping
        </button>
      </div>
    `;
    cartFooter.style.display = "none";
    return;
  }

  cartFooter.style.display = "flex";

  cartBody.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-img">
        <img src="${item.image}" alt="${escapeHtml(item.name)}" />
      </div>
      <div class="cart-item-info">
        <h4 class="cart-item-name">${escapeHtml(item.name)}</h4>
        <div class="cart-item-unit-price">₹${item.price.toLocaleString('en-IN')} each</div>
        <div class="cart-qty-row">
          <button class="qty-btn" onclick="handleUpdateCartQty(${item.id}, -1)" aria-label="Decrease quantity">−</button>
          <span class="qty-value">${item.quantity}</span>
          <button class="qty-btn" onclick="handleUpdateCartQty(${item.id}, 1)" aria-label="Increase quantity">+</button>
        </div>
      </div>
      <div class="cart-item-right">
        <span class="cart-item-total">₹${(item.price * item.quantity).toLocaleString('en-IN')}</span>
        <button class="cart-item-remove" onclick="handleRemoveCartItem(${item.id})" aria-label="Remove item">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
        </button>
      </div>
    </div>
  `).join("");

  document.getElementById("cartSubtotalAmount").textContent = `₹${totalAmount.toLocaleString('en-IN')}`;
}

// ============================================================================
// 9. WhatsApp Checkout & Order Integration
// ============================================================================

// Direct single product order from product card
window.handleDirectWhatsAppOrder = function(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const item = {
    id: product.id,
    name: product.name,
    price: product.price,
    quantity: 1
  };

  openCheckoutModal([item]);
};

// Cart Checkout
window.handleCartWhatsAppCheckout = function() {
  if (cart.length === 0) {
    showToast("Your flower basket is empty!", "info");
    return;
  }
  closeCartDrawer();
  openCheckoutModal([...cart]);
};

function openCheckoutModal(itemsToOrder) {
  checkoutItems = itemsToOrder;
  const modalOverlay = document.getElementById("checkoutModalOverlay");
  const summaryContainer = document.getElementById("modalOrderItemsList");
  const totalDisplay = document.getElementById("modalOrderTotal");

  if (!modalOverlay || !summaryContainer) return;

  const totalAmount = checkoutItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  summaryContainer.innerHTML = checkoutItems.map(item => `
    <div class="summary-item-line">
      <span>${escapeHtml(item.name)} (x${item.quantity})</span>
      <span>₹${(item.price * item.quantity).toLocaleString('en-IN')}</span>
    </div>
  `).join("");

  if (totalDisplay) {
    totalDisplay.textContent = `₹${totalAmount.toLocaleString('en-IN')}`;
  }

  // Pre-fill delivery date to tomorrow
  const dateInput = document.getElementById("orderDeliveryDate");
  if (dateInput) {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    dateInput.min = `${yyyy}-${mm}-${dd}`;
    if (!dateInput.value) {
      dateInput.value = `${yyyy}-${mm}-${dd}`;
    }
  }

  modalOverlay.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeCheckoutModal() {
  const modalOverlay = document.getElementById("checkoutModalOverlay");
  if (modalOverlay) {
    modalOverlay.classList.remove("open");
  }
  document.body.style.overflow = "";
}

function setupCheckoutModal() {
  const modalOverlay = document.getElementById("checkoutModalOverlay");
  const closeBtn = document.getElementById("closeModalBtn");
  const form = document.getElementById("whatsappOrderForm");

  if (closeBtn) {
    closeBtn.addEventListener("click", closeCheckoutModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) {
        closeCheckoutModal();
      }
    });
  }

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const customerName = document.getElementById("orderCustomerName").value.trim();
      const deliveryAddress = document.getElementById("orderDeliveryAddress").value.trim();
      const deliveryDate = document.getElementById("orderDeliveryDate").value.trim();
      const specialNote = document.getElementById("orderSpecialNote").value.trim();

      if (!customerName || !deliveryAddress || !deliveryDate) {
        showToast("Please fill in your name, delivery address, and date.", "info");
        return;
      }

      // Calculate total
      const totalAmount = checkoutItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

      // Build Order Details lines exactly matching the requested format:
      // 1. Red Rose Bouquet - Qty: 2 - ₹799 each
      const orderLines = checkoutItems.map((item, idx) => {
        return `${idx + 1}. ${item.name} - Qty: ${item.quantity} - ₹${item.price.toLocaleString('en-IN')}${item.quantity > 1 ? ' each' : ''}`;
      }).join("\n");

      // Format Date for pleasant reading (e.g. 2026-11-05)
      let formattedDate = deliveryDate;
      try {
        const parts = deliveryDate.split("-");
        if (parts.length === 3) {
          const d = new Date(parts[0], parts[1] - 1, parts[2]);
          formattedDate = d.toLocaleDateString("en-IN", {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric"
          });
        }
      } catch (err) {
        formattedDate = deliveryDate;
      }

      // Exact Message Template
      let message = `Hello Bloom & Bliss!

I would like to place an order.

Order Details:
${orderLines}

Total Amount: ₹${totalAmount.toLocaleString('en-IN')}

Customer Name: ${customerName}
Delivery Address: ${deliveryAddress}
Required Delivery Date: ${formattedDate}`;

      if (specialNote) {
        message += `\nSpecial Instructions / Card Note: ${specialNote}`;
      }

      message += `\n\nPlease confirm my order.\n\nThank you!`;

      // Open WhatsApp URL
      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, "_blank");

      // Post-order cleanup
      closeCheckoutModal();
      form.reset();

      // If this was a full cart order, clear the cart
      if (checkoutItems === cart || checkoutItems.length === cart.length) {
        cart = [];
        saveCartToStorage();
      }

      showToast("Order initiated! Redirecting you to WhatsApp...", "success");
    });
  }
}

// ============================================================================
// 10. Drawer, Navigation & Scroll Behaviors
// ============================================================================
function setupNavigation() {
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const mobileNav = document.getElementById("mobileNav");
  const navLinks = document.querySelectorAll(".nav-link, .mobile-nav-link");
  const header = document.querySelector(".header-sticky");

  // Sticky Navbar shadow on scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      header?.classList.add("scrolled");
    } else {
      header?.classList.remove("scrolled");
    }
  });

  // Mobile menu toggle
  if (hamburgerBtn && mobileNav) {
    hamburgerBtn.addEventListener("click", () => {
      const isOpen = mobileNav.classList.contains("open");
      hamburgerBtn.classList.toggle("active", !isOpen);
      mobileNav.classList.toggle("open", !isOpen);
    });

    // Close on link click
    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        hamburgerBtn.classList.remove("active");
        mobileNav.classList.remove("open");
      });
    });
  }

  // Active section indicator on scroll
  const sections = document.querySelectorAll("section[id]");
  window.addEventListener("scroll", () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute("id");

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        document.querySelectorAll(`.nav-link[href*="${sectionId}"]`).forEach(l => l.classList.add("active"));
      } else {
        document.querySelectorAll(`.nav-link[href*="${sectionId}"]`).forEach(l => l.classList.remove("active"));
      }
    });
  });
}

function setupCartDrawer() {
  const openCartBtn = document.getElementById("navCartBtn");
  const closeCartBtn = document.getElementById("closeCartDrawerBtn");
  const cartDrawerOverlay = document.getElementById("cartDrawerOverlay");

  if (openCartBtn) {
    openCartBtn.addEventListener("click", openCartDrawer);
  }

  if (closeCartBtn) {
    closeCartBtn.addEventListener("click", closeCartDrawer);
  }

  if (cartDrawerOverlay) {
    cartDrawerOverlay.addEventListener("click", (e) => {
      if (e.target === cartDrawerOverlay) {
        closeCartDrawer();
      }
    });
  }
}

window.openCartDrawer = function() {
  const overlay = document.getElementById("cartDrawerOverlay");
  if (overlay) {
    overlay.classList.add("open");
    document.body.style.overflow = "hidden";
  }
};

window.closeCartDrawer = function() {
  const overlay = document.getElementById("cartDrawerOverlay");
  if (overlay) {
    overlay.classList.remove("open");
    document.body.style.overflow = "";
  }
};

window.scrollToSection = function(sectionId) {
  const el = document.getElementById(sectionId);
  if (el) {
    const offset = 80;
    const pos = el.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top: pos, behavior: "smooth" });
  }
};

function setupFloatingActions() {
  const backToTopBtn = document.getElementById("backToTopBtn");
  const floatingWhatsApp = document.getElementById("floatingWhatsAppBtn");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      backToTopBtn?.classList.add("visible");
    } else {
      backToTopBtn?.classList.remove("visible");
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  if (floatingWhatsApp) {
    floatingWhatsApp.addEventListener("click", () => {
      const message = `Hello Bloom & Bliss! I'm browsing your online floral boutique and would like some assistance with an order.`;
      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
      window.open(url, "_blank");
    });
  }
}

function setupScrollEffects() {
  // Intersection Observer for subtle scroll animations
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15
  });

  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
}

function setupContactForm() {
  const form = document.getElementById("contactInquiryForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("contactName").value.trim();
    const phone = document.getElementById("contactPhone").value.trim();
    const occasion = document.getElementById("contactOccasion").value;
    const msg = document.getElementById("contactMessage").value.trim();

    const text = `Hello Bloom & Bliss!

New Inquiry from Website:
Name: ${name}
Phone: ${phone}
Occasion: ${occasion || "General Inquiry"}
Message: ${msg}

Looking forward to your reply!`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");

    form.reset();
    showToast("Thank you! Your message has been sent to our florist on WhatsApp.", "success");
  });
}

// ============================================================================
// 11. Toast Notifications & Helpers
// ============================================================================
function showToast(message, type = "info") {
  let container = document.getElementById("toastContainer");
  if (!container) {
    container = document.createElement("div");
    container.id = "toastContainer";
    container.className = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = `toast ${type === "success" ? "toast-success" : ""}`;

  const icon = type === "success" ? "✓" : "🌸";
  toast.innerHTML = `<span>${icon}</span> <span>${escapeHtml(message)}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(10px)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3200);
}

function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

