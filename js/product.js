import { updateCartCount, setupCartDropdown, addToCart } from "./cart.js";

const productContainer = document.getElementById("product-detail");

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

async function fetchProduct(id) {
  try {
    const response = await fetch(`https://v2.api.noroff.dev/gamehub/${id}`);
    const json = await response.json();
    displayProduct(json.data);
  } catch (error) {
    console.error("Failed to fetch product", error);
    productContainer.innerHTML = `<p>Failed to load product.</p>`;
  }
}

function displayProduct(product) {
  const image = product.image || {
    url: "https://via.placeholder.com/600x400?text=No+Image",
    alt: "No image available",
  };

  productContainer.innerHTML = `
    <div class="product-image">
      <img src="${image.url}" alt="${image.alt}" />
    </div>
    <div class="product-info">
      <h2>${product.title}</h2>
      <p><strong>Genre:</strong> ${product.genre}</p>
      <p><strong>Released:</strong> ${product.released}</p>
      <p><strong>Age Rating:</strong> ${product.ageRating}</p>
      <p class="description">${product.description}</p>
      <p class="price">
        ${
          product.discountedPrice < product.price
            ? `<span class="old-price">$${product.price.toFixed(2)}</span>`
            : ""
        }
        <span class="discounted-price">$${product.discountedPrice.toFixed(
          2
        )}</span>
      </p>
      <button class="add-to-cart">Add to Cart</button>
    </div>
  `;

  const button = document.querySelector(".add-to-cart");
  if (button) {
    button.addEventListener("click", () => {
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        discountedPrice: product.discountedPrice,
        image: product.image,
      });
    });
  }
}

if (productId) {
  fetchProduct(productId);
} else {
  productContainer.innerHTML = `<p>No product ID found in URL.</p>`;
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  setupCartDropdown();
});
