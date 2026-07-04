const MENU = {
  starters: [
    {
      id: "s1", name: "Smoked Wing Basket", desc: "Half dozen, choice of dry rub or buffalo", price: 11,
      img: "https://images.unsplash.com/photo-1578875858391-50798bc2ffee?w=500&q=75&auto=format&fit=crop",
    },
    {
      id: "s2", name: "Truffle Parmesan Fries", desc: "Hand-cut fries, truffle oil, shaved parmesan", price: 9,
      img: "https://images.unsplash.com/photo-1639744091981-2f826321fae6?w=500&q=75&auto=format&fit=crop",
    },
  ],
  salads: [
    {
      id: "sa1", name: "Roasted Beet Salad", desc: "Whipped goat cheese, candied walnuts, arugula", price: 9.5,
      img: "https://images.unsplash.com/photo-1612488261779-be3483951c46?w=500&q=75&auto=format&fit=crop",
    },
  ],
  mains: [
    {
      id: "m1", name: "Wood-Fired Ribeye", desc: "12oz, herb butter, roasted fingerlings", price: 27,
      img: "https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=500&q=75&auto=format&fit=crop",
    },
    {
      id: "m2", name: "Copper Fork Burger", desc: "Double patty, smoked cheddar, fork sauce, fries", price: 15,
      img: "https://images.unsplash.com/photo-1627781962452-6b468257844b?w=500&q=75&auto=format&fit=crop",
    },
    {
      id: "m3", name: "Cast Iron Mac & Cheese", desc: "Three cheese blend, toasted breadcrumb", price: 13,
      img: "https://images.unsplash.com/photo-1707528904014-658b4c068ec5?w=500&q=75&auto=format&fit=crop",
    },
    {
      id: "m4", name: "Grilled Salmon", desc: "Charred lemon, dill yogurt, seasonal veg", price: 22,
      img: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500&q=75&auto=format&fit=crop",
    },
  ],
  drinks: [
    {
      id: "dr1", name: "Fresh Lemonade", desc: "House-squeezed, served over ice", price: 4,
      img: "https://images.unsplash.com/photo-1554040230-890ee5596bfa?w=500&q=75&auto=format&fit=crop",
    },
    {
      id: "dr2", name: "Sweet Iced Tea", desc: "Brewed daily, lemon wedge", price: 3.5,
      img: "https://images.unsplash.com/photo-1694953592580-0953c63ffec2?w=500&q=75&auto=format&fit=crop",
    },
  ],
  desserts: [
    {
      id: "d1", name: "Skillet Cookie", desc: "Warm chocolate chip, vanilla ice cream", price: 8,
      img: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=500&q=75&auto=format&fit=crop",
    },
    {
      id: "d2", name: "Salted Caramel Cheesecake", desc: "Blueberry compote, graham crust", price: 7.5,
      img: "https://images.unsplash.com/photo-1695088957322-e253097aa640?w=500&q=75&auto=format&fit=crop",
    },
  ],
};

const cart = {};

function renderMenu() {
  for (const section of Object.keys(MENU)) {
    const container = document.querySelector(`[data-items="${section}"]`);
    container.innerHTML = MENU[section].map(item => `
      <div class="item">
        <img class="item-img" src="${item.img}" alt="${item.name}" loading="lazy">
        <div class="item-body">
          <div class="item-info">
            <h3>${item.name}</h3>
            <p>${item.desc}</p>
          </div>
          <div class="item-actions">
            <span class="item-price">$${item.price.toFixed(2)}</span>
            <button class="add-btn" data-id="${item.id}">Add</button>
          </div>
        </div>
      </div>
    `).join("");
  }
}

function findItem(id) {
  for (const section of Object.values(MENU)) {
    const found = section.find(i => i.id === id);
    if (found) return found;
  }
  return null;
}

function addToCart(id) {
  cart[id] = (cart[id] || 0) + 1;
  renderCart();
}

function removeFromCart(id) {
  delete cart[id];
  renderCart();
}

function renderCart() {
  const ids = Object.keys(cart);
  const cartEl = document.getElementById("cart");
  const itemsEl = document.getElementById("cart-items");
  const emptyEl = document.getElementById("cart-empty");
  const countEl = document.getElementById("cart-count");
  const totalEl = document.getElementById("cart-total");

  cartEl.classList.toggle("has-items", ids.length > 0);

  const count = ids.reduce((sum, id) => sum + cart[id], 0);
  countEl.textContent = `${count} item${count === 1 ? "" : "s"}`;

  if (ids.length === 0) {
    emptyEl.style.display = "block";
    itemsEl.innerHTML = "";
    totalEl.textContent = "$0.00";
    return;
  }

  emptyEl.style.display = "none";
  let total = 0;
  itemsEl.innerHTML = ids.map(id => {
    const item = findItem(id);
    const qty = cart[id];
    const lineTotal = item.price * qty;
    total += lineTotal;
    return `
      <div class="cart-line">
        <span>${qty} × ${item.name}</span>
        <span>$${lineTotal.toFixed(2)} <button data-remove="${id}">remove</button></span>
      </div>
    `;
  }).join("");
  totalEl.textContent = `$${total.toFixed(2)}`;
}

document.addEventListener("click", (e) => {
  if (e.target.matches(".add-btn")) {
    addToCart(e.target.dataset.id);
  }
  if (e.target.matches("[data-remove]")) {
    removeFromCart(e.target.dataset.remove);
  }
});

document.getElementById("cart-toggle").addEventListener("click", () => {
  document.getElementById("cart").classList.toggle("collapsed");
});

const overlay = document.getElementById("modal-overlay");

document.getElementById("checkout-btn").addEventListener("click", () => {
  if (Object.keys(cart).length === 0) return;
  overlay.classList.add("open");
});

document.getElementById("modal-close").addEventListener("click", () => {
  overlay.classList.remove("open");
});

document.getElementById("checkout-form").addEventListener("submit", (e) => {
  e.preventDefault();
  overlay.classList.remove("open");
  alert("Demo order placed! In a real build, this would send the order to the kitchen and confirm by text/email.");
  Object.keys(cart).forEach(id => delete cart[id]);
  renderCart();
});

// Category pills: click to scroll, scrollspy to highlight active category
const pills = Array.from(document.querySelectorAll(".pill"));
const categories = pills.map(p => document.getElementById(p.dataset.target));

pills.forEach(pill => {
  pill.addEventListener("click", () => {
    document.getElementById(pill.dataset.target).scrollIntoView({ behavior: "smooth" });
  });
});

function updateActivePill() {
  const scrollPos = window.scrollY + 100;
  let current = categories[0];
  for (const cat of categories) {
    if (cat.offsetTop <= scrollPos) current = cat;
  }
  pills.forEach(p => p.classList.toggle("active", p.dataset.target === current.id));
}

window.addEventListener("scroll", updateActivePill, { passive: true });

renderMenu();
renderCart();
updateActivePill();
