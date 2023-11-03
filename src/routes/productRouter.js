import { Router } from "express";
import ProductManager from "../controller/ProductManager.js";
import { productsModel } from "../dao/mongo/products.model.js";
const pm = new ProductManager();

const productRouter = Router();

productRouter.get("/", async (req, res) => {
  try {
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

    const products = await productsModel.paginate(modelQuery, {
      limit: modelLimit,
      page: modelPage,
      customLabels: myCustomLabels,
      sort: modelSort,
    });
    const queryURL = encodeURIComponent(JSON.stringify(modelQuery));
    console.log(queryURL);
    products.prevLink = products.hasPrevPage
      ? `/api/products?page=${products.prevLink}&limit=${modelLimit}&sort=${req.query.sort}&query=${queryURL}`
      : null;
    products.nextLink = products.hasNextPage
      ? `/api/products?page=${products.nextLink}&limit=${modelLimit}&sort=${req.query.sort}&query=${queryURL}`
      : null;

    res.send(products);
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
});

productRouter.post(`/`, async (req, res) => {
  console.log(req.body);
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
    try {
      await pm.addProduct(
        req.body.title,
        req.body.description,
        req.body.code,
        req.body.price,
        req.body.status,
        req.body.stock,
        req.body.category,
        thumbnail
      );
      res.status(200).send();
      req.context.socketServer.emit(`products`, await pm.getProducts());
    } catch (error) {
      res.status(400).send(error);
    }
  } else {
    res.status(400).send();
  }
});

productRouter.delete("/:pid", async (req, res) => {
  try {
    await pm.deleteProduct(req.params.pid);
    req.context.socketServer.emit(`products`, await pm.getProducts());
    res.status(200).send();
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

productRouter.put("/:pid", async (req, res) => {
  const pid = parseInt(req.params.pid, 10);
  const updatedData = req.body;

  try {
    await pm.updateProduct(pid, updatedData);
    res.status(204).send();
  } catch (error) {
    res.status(500).send(error);
  }
});

productRouter.post("/category/:categoryName", async (req, res) => {
  try {
    await pm.newCategory(req.params.categoryName);
    res.status(200).send();
  } catch (e) {
    res.status(500).send();
  }
});

export default productRouter;
