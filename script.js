const gameContainer = document.getElementById("product-list"); // Use correct container
let products = [];

async function fetchGames() {
  try {
    const response = await fetch("https://api.noroff.dev/api/v1/gamehub");
    products = await response.json();
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
      <a href="product/product.html?id=${product.id}" class="product-link">
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

// Genre filtering
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

/* const gameContainer = document.getElementById("game-container");

async function fetchGames() {
  try {
    const response = await fetch("https://api.noroff.dev/api/v1/gamehub");
    const games = await response.json();

    games.forEach((game) => {
      const card = document.createElement("div");
      card.className = "game-card";

      card.innerHTML = `
        <img src="${game.image.url}" alt="${game.image.alt}">
        <div class="game-title">${game.title}</div>
        <div>${game.genre} • ${game.released} • ${game.ageRating}</div>
        <div>
          ${game.onSale ? `<span class="old-price">$${game.price}</span>` : ""}
          <span class="game-price">$${game.discountedPrice}</span>
        </div>
      `;

      gameContainer.appendChild(card);
    });
    let products = [];

    async function fetchGames() {
      try {
        const response = await fetch("https://api.noroff.dev/api/v1/gamehub");
        products = await response.json();
        displayProducts(products);
      } catch (error) {
        console.error("Failed to load games:", error);
      }
    }
  } catch (error) {
    console.error("Failed to load games:", error);
    gameContainer.innerHTML = "<p>Failed to load games. Try again later.</p>";
  }
}

fetchGames();

function displayProducts(productArray) {
  const container = document.getElementById("product-list");
  container.innerHTML = "";

  productArray.forEach((product) => {
    container.innerHTML += `
    <a href="product.html?id=${product.id}" class="product-link">
    <div class="product-card">
      <img src="${product.image.url}" alt="${product.image.alt}" />
      <h2>${product.title}</h2>
      <p>${product.genre}</p>
      <p>${product.description}</p>
      <p>$${product.discountedPrice}</p>
    </div>
  </a>
      `;
  });
}

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
*/
