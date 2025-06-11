import { updateCartCount, setupCartDropdown } from "./cart.js";

const gameContainer = document.getElementById("product-list");
let products = [];

async function fetchGames() {
  try {
    const response = await fetch("https://v2.api.noroff.dev/gamehub");
    const json = await response.json();
    products = json.data;
    displayProducts(products);
  } catch (error) {
    console.error("Failed to load games:", error);
    gameContainer.innerHTML = "<p>Failed to load games. Try again later.</p>";
  }
}

function displayProducts(productArray) {
  gameContainer.innerHTML = "";

  productArray.forEach((product) => {
    gameContainer.innerHTML += `
      <a href="product.html?id=${product.id}" class="product-link">
        <div class="game-card">
          <img src="${product.image.url}" alt="${product.image.alt}" />
          <div class="game-title">${product.title}</div>
          <div>${product.genre} • ${product.released} • ${
      product.ageRating
    }</div>
          <div>
            ${
              product.onSale
                ? `<span class="old-price">$${product.price}</span>`
                : ""
            }
            <span class="game-price">$${product.discountedPrice}</span>
          </div>
        </div>
      </a>
    `;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  setupCartDropdown();
});

document.getElementById("filters").addEventListener("click", (e) => {
  if (e.target.dataset.genre) {
    const genre = e.target.dataset.genre;
    const filtered =
      genre === "All"
        ? products
        : products.filter((product) => product.genre === genre);
    displayProducts(filtered);
  }
});

fetchGames();
