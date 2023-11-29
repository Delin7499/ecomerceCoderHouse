const socket = io();

const cartContainer = document.getElementById("cart");
const productsContainer = document.getElementById("products");
const cartId = cartContainer.getAttribute("data-id");

if (cartContainer) {
  const cartId = cartContainer.getAttribute("data-id");

  socket.on("cartUpdate", (cartData) => {
    renderCartProducts(cartData.products);
    setupDeleteButtons();
  });

  fetchCartData(cartId);
}

function fetchCartData(cartId) {
  // Make a request to your server to get the products in the cart
  fetch(`/api/carts/${cartId}`)
    .then((response) => response.json())
    .then((products) => {
      renderCartProducts(products);
      setupDeleteButtons(); // Setup event listeners for delete buttons after rendering
    })
    .catch((error) => {
      console.error("Error fetching cart data:", error);
    });
}

function renderCartProducts(products) {
  // Render the products in the cart
  const productsList = products.map((prod) => {
    return `<div id="${prod.product._id}" class="product">
    <h2>${prod.product.title}</h2>
      <h4>Cantidad ${prod.quantity}</h4>
      <img src="${prod.product.thumbnail}" alt="${prod.product.title} Image" />
      <p class="price">Price: $ ${prod.product.price}</p>
      <button class="delete-product-button" data-product-id="${prod.product._id}">Delete</button>
    </div>`;
  });

  // Update the products container with the rendered products
  productsContainer.innerHTML = productsList.join("");
}

function setupDeleteButtons() {
  // Add event listeners for delete buttons
  const deleteButtons = document.querySelectorAll(".delete-product-button");

  deleteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.getAttribute("data-product-id");
      const cartId = cartContainer.getAttribute("data-id");

      // Send a delete request to your server
      fetch(`/api/carts/${cartId}/products/${productId}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((cartData) => {
          // Handle the updated cart data if needed
          renderCartProducts(cartData.products);
        })
        .catch((error) => {
          console.error("Error deleting product:", error);
        });
    });
  });
}
