const socket = io();

const productosContainer = document.getElementById("products");

socket.on("products", (productos) => {
  const productoslist = productos.map(
    (prod) => `<div id="${prod._id}" class="product">
      <h2>${prod.title}</h2>
      <p>Description: ${prod.description}</p>
      <p>Code: ${prod.code}</p>
      <p>Stock: ${prod.stock}</p>
      <p>Category: ${prod.category}</p>
      <img src="${prod.thumbnail}" alt="${prod.title} Image" />
      <p class="price">Price: $ ${prod.price}</p>
      <button class="add-to-cart-button">Add to Cart</button>
    </div>`
  );

  productosContainer.innerHTML = productoslist.join("");
});

const cartSelect = document.getElementById("cartSelect");

const addedCartIds = [];
socket.on("carts", (carts) => {
  carts.forEach((cart) => {
    if (!addedCartIds.includes(cart._id)) {
      const option = document.createElement("option");
      option.textContent = cart._id;
      cartSelect.appendChild(option);

      addedCartIds.push(cart._id);
    }
  });
});
const cartContainer = document.getElementById("cart");
const cartId = cartContainer.getAttribute("data-id");
productosContainer.addEventListener("click", function (event) {
  if (event.target.classList.contains("add-to-cart-button")) {
    const productDiv = event.target.closest(".product");
    const productId = productDiv.id;

    fetch(`/api/carts/${cartId}/product/${productId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).catch((error) => {
      console.error("Error:", error);
    });
  }
});

const cartButton = document.getElementById("cartButton");
cartButton.addEventListener("click", function () {
  const cartEndpoint = `/carts/${cartSelect.value}`;

  window.location.href = cartEndpoint;
});

const newCartButtom = document.getElementById("newCartButtom");
newCartButtom.addEventListener("click", function () {
  fetch(`/api/carts/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  }).catch((error) => {
    console.error("Error:", error);
  });
});
