export function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

export function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(product) {
  const cart = getCart();
  const existing = cart.find((item) => item.id === product.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  saveCart(cart);
  updateCartCount();
}

export function updateCartCount() {
  const cart = getCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartCount = document.getElementById("cart-count");
  if (cartCount) cartCount.textContent = totalItems;
}

export function removeFromCart(productId) {
  const cart = getCart().filter((item) => item.id !== productId);
  saveCart(cart);
  updateCartCount();
}

export function setupCartDropdown() {
  const cartIcon = document.getElementById("cart");
  if (!cartIcon) return;

  const dropdown = document.createElement("div");
  dropdown.className = "cart-dropdown";
  document.body.appendChild(dropdown);

  function renderCart() {
    const cart = getCart();
    dropdown.innerHTML = "";

    if (cart.length === 0) {
      dropdown.innerHTML = "<p>Your cart is empty.</p>";
    } else {
      cart.forEach((item) => {
        const itemEl = document.createElement("div");
        itemEl.className = "cart-item";
        itemEl.innerHTML = `
            <div>${item.title}</div>
            <div>x<span>${item.quantity}</span></div>
          `;
        dropdown.appendChild(itemEl);
      });

      const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      const totalEl = document.createElement("div");
      totalEl.className = "cart-total";
      totalEl.textContent = `Total: $${total.toFixed(2)}`;
      dropdown.appendChild(totalEl);

      const checkoutBtn = document.createElement("button");
      checkoutBtn.textContent = "Checkout";
      checkoutBtn.onclick = () => {
        window.location.href = "cart.html";
      };

      dropdown.appendChild(checkoutBtn);
    }
  }

  cartIcon.addEventListener("click", () => {
    dropdown.classList.toggle("active");
    if (dropdown.classList.contains("active")) {
      renderCart();
    }
  });

  document.addEventListener("click", (e) => {
    if (!cartIcon.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.classList.remove("active");
    }
  });
}
