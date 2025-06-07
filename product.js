const productContainer = document.getElementById("product-detail");

// Get product ID from query string
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

// Fetch and display product by ID
async function fetchProduct(id) {
  try {
    const response = await fetch(`https://api.noroff.dev/api/v1/gamehub/${id}`);
    const product = await response.json();
    displayProduct(product);
  } catch (error) {
    console.error("Failed to fetch product", error);
    productContainer.innerHTML = `<p>Failed to load product.</p>`;
  }
}

function displayProduct(product) {
  productContainer.innerHTML = `
    <div class="product-image">
      <img src="${product.image.url}" alt="${product.image.alt}" />
    </div>
    <div class="product-info">
      <h2>${product.title}</h2>
      <p><strong>Genre:</strong> ${product.genre}</p>
      <p><strong>Released:</strong> ${product.released}</p>
      <p><strong>Age Rating:</strong> ${product.ageRating}</p>
      <p class="description">${product.description}</p>
      <p class="price">
        ${
          product.onSale
            ? `<span class="old-price">$${product.price}</span>`
            : ""
        }
        <span class="discounted-price">$${product.discountedPrice}</span>
      </p>
      <button class="add-to-cart">Add to Cart</button>
    </div>
  `;
}

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// Run it
if (productId) {
  fetchProduct(productId);
} else {
  productContainer.innerHTML = `<p>No product ID found in URL.</p>`;
}
