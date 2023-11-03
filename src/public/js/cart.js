const socket = io();

const cartContainer = document.getElementById("cart");
const productosContainer = document.getElementById("products");
const cartId = cartContainer.getAttribute("data-id");

fetch(`/api/carts/${cartId}`, {
  method: "GET",
})
  .then((response) => {
    return response.json();
  })
  .then((products) => {
    console.log(products);
    const productoslist = products.map(
      (prod) => `<div id="${prod._id}" class="product">
      <h2>${prod.product.title}</h2>
      <h4>Cantidad ${prod.quantity}</h4>
      <img src="${prod.product.thumbnail}" alt="${prod.product.title} Image" />
      <p class="price">Price: $ ${prod.product.price}</p>
    </div>`
    );

    productosContainer.innerHTML = productoslist.join("");
  })
  .catch((error) => {
    console.error("Error:", error);
  });
