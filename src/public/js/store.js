const socket = io();

const productosContainer = document.getElementById("products");
const applyFiltersButton = document.getElementById("applyFilters");
if (applyFiltersButton) {
  applyFiltersButton.addEventListener("click", function () {
    const limit = document.getElementById("limit").value;
    const page = document.getElementById("page").value;
    const sort = document.getElementById("sort").value;

    // Fetch products with the selected filters (limit, page, sort)
    fetchProducts(limit, page, sort);
  });
}

const fetchProducts = (limit, page, sort) => {
  fetch(`/api/products?limit=${limit}&page=${page}&sort=${sort}`)
    .then((response) => response.json())
    .then((products) => {
      const productoslist = products.payload.map(
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
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
    });
};
const fetchProductsDefault = async () => {
  try {
    fetch(`/api/products?limit=${limit}&page=${page}&sort=${sort}`)
      .then((response) => response.json())
      .then((products) => {
        // Update the products container with the fetched products
        const productoslist =
          products.map(/* ... your product rendering logic ... */);
        productosContainer.innerHTML = productoslist.join("");
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
    const response = await fetch("/api/products");

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.statusText}`);
    }

    const products = await response.json();

    const productoslist = products.payload.map(
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
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

if (productosContainer) {
  fetchProducts("10", "1", "asc");

  socket.on("products", () => {
    fetchProducts("10", "1", "asc");
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
}
