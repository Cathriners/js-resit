import { getCart, removeFromCart, updateCartCount } from "./cart.js";

const cartItemsContainer = document.getElementById("cart-items");
const cartTotalElement = document.getElementById("cart-total");

function renderCartPage() {
  const cart = getCart();
  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    cartTotalElement.textContent = "";
    return;
  }

  let total = 0;

  cart.forEach((item) => {
    const subtotal = item.discountedPrice * item.quantity;
    total += subtotal;

    const itemEl = document.createElement("div");
    itemEl.className = "cart-item";
    itemEl.innerHTML = `
      <div>
        <div class="cart-item-title">${item.title}</div>
        <div>$${item.discountedPrice.toFixed(2)} × ${
      item.quantity
    } = $${subtotal.toFixed(2)}</div>
      </div>
      <button class="remove-btn" data-id="${item.id}">Remove</button>
    `;

    cartItemsContainer.appendChild(itemEl);
  });

  cartTotalElement.textContent = `Total: $${total.toFixed(2)}`;

  document.querySelectorAll(".remove-btn").forEach((button) => {
    button.addEventListener("click", (e) => {
      const id = e.target.dataset.id;
      removeFromCart(id);
      renderCartPage();
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  renderCartPage();

  const form = document.getElementById("checkout-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const name = encodeURIComponent(formData.get("name"));
    const email = encodeURIComponent(formData.get("email"));

    localStorage.removeItem("cart");

    window.location.href = `confirmation.html?name=${name}&email=${email}`;
  });
});
