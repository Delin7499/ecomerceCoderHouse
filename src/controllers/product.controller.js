import { CategoryService, ProductService } from "../repositories/index.js";
import { createErrorResponse } from "../utils.js";

export const getProductsPaginated = async (req, res) => {
  const { limit, page, sort, query } = req.query;

  const sortObjectMapper = {
    asc: { price: 1 },
    desc: { price: -1 },
  };

  const modelQuery = query ? JSON.parse(query) : {};
  const modelLimit = limit ? parseInt(limit, 10) : 10;
  const modelPage = page ? parseInt(page, 10) : 1;
  const modelSort = sortObjectMapper[sort] ?? undefined;

  const myCustomLabels = {
    docs: "payload",
    prevPage: "prevLink",
    nextPage: "nextLink",
  };

  const products = await ProductService.getAllPaginated(modelQuery, {
    limit: modelLimit,
    page: modelPage,
    customLabels: myCustomLabels,
    sort: modelSort,
  });
  const queryURL = encodeURIComponent(JSON.stringify(modelQuery));
  products.prevLink = products.hasPrevPage
    ? `/api/products?page=${products.prevLink}&limit=${modelLimit}&sort=${req.query.sort}&query=${queryURL}`
    : null;
  products.nextLink = products.hasNextPage
    ? `/api/products?page=${products.nextLink}&limit=${modelLimit}&sort=${req.query.sort}&query=${queryURL}`
    : null;

  res.send(products);
};

export const getProductById = async (req, res) => {
  const product = await ProductService.getById(req.params.pid);
  if (product) {
    res.status(200).send(product);
  } else {
    res.status(404).send();
  }
};

export const addProduct = async (req, res) => {
  if (
    req.body.title &&
    req.body.description &&
    req.body.code &&
    req.body.price &&
    req.body.status &&
    req.body.stock &&
    req.body.category
  ) {
    const thumbnail = req.body.thumbnail ?? "";
    const newProduct = await ProductService.create({
      title: req.body.title,
      description: req.body.description,
      code: req.body.code,
      price: req.body.price,
      status: req.body.status,
      stock: req.body.stock,
      category: req.body.category,
      owner: req.session.email,
      thumbnail,
    });

    res.status(200).send(newProduct);
    req.context.socketServer.emit(`products`, await ProductService.getAll());
  } else {
    res.status(400).send();
  }
};

export const deleteProduct = async (req, res) => {
  const product = await ProductService.getById(req.params.pid);
  if (product.owner !== req.session.email || req.session.role !== "Admin") {
    return res.status(401).send("Unauthorized");
  }
  await ProductService.delete(req.params.pid);
  req.context.socketServer.emit(`products`, await ProductService.getAll());
  res.status(200).send();
};

export const updateProduct = async (req, res) => {
  const pid = req.params.pid;
  const updatedData = req.body;

  const update = await ProductService.update(pid, updatedData);
  res.status(200).send(update);
};

export const addCategory = async (req, res) => {
  const newCategory = await CategoryService.create({
    name: req.params.categoryName,
  });
  res.status(200).send(newCategory);
};
