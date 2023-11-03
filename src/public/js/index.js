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
    </div>`
  );

  productosContainer.innerHTML = productoslist.join("");
});

socket.on("products_update", (productos) => {
  const productoslist = productos.map(
    (prod) => `<div id="${prod._id}" class="product">
      <h2>${prod.title}</h2>
      <p>Description: ${prod.description}</p>
      <p>Code: ${prod.code}</p>
      <p>Stock: ${prod.stock}</p>
      <p>Category: ${prod.category}</p>
      <img src="${prod.thumbnail}" alt="${prod.title} Image" />
      <p class="price">Price: $ ${prod.price}</p>
    </div>`
  );

  productosContainer.innerHTML = productoslist.join("");
});

const form = document.querySelector("#productForm");

form.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the default form submission behavior

  // Collect form data as shown in step 2
  const formData = {
    title: document.querySelector("#title").value,
    description: document.querySelector("#description").value,
    code: document.querySelector("#code").value,
    price: parseFloat(document.querySelector("#price").value),
    status: document.querySelector("#status").checked,
    stock: parseInt(document.querySelector("#stock").value),
    category: document.querySelector("#category").value,
    thumbnail: document.querySelector("#thumbnail").value,
  };
  fetch("/api/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  }).catch((error) => {
    console.error("Error:", error);
  });
});

const deleteForm = document.getElementById("deleteProductForm");

deleteForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const productId = document.getElementById("deleteId").value;

  fetch(`/api/products/${productId}`, {
    method: "DELETE",
  }).catch((error) => {
    console.error("Error:", error);
  });
});

const categoryForm = document.getElementById("addCategoryForm");

categoryForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const categoryName = document.getElementById("categoryName").value;

  fetch(`/api/products/category/${categoryName}`, {
    method: "POST",
  }).catch((error) => {
    console.error("Error:", error);
  });
});

const categorySelect = document.getElementById("category");

// Define an array of categories (you can fetch this data from an API or another source)

socket.on("categories", (categories) => {
  // Populate the <select> element with options
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.textContent = category.name; // Set the text displayed in the option
    categorySelect.appendChild(option); // Add the option to the <select>
  });
});
