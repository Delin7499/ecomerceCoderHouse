import { Router } from "express";

import {
  addCategory,
  addProduct,
  deleteProduct,
  getProductsPaginated,
  updateProduct,
} from "../controller/products.controller.js";

const productRouter = Router();

productRouter.get("/", getProductsPaginated);

productRouter.post(`/`, addProduct);

productRouter.delete("/:pid", deleteProduct);

productRouter.put("/:pid", updateProduct);

productRouter.post("/category/:categoryName", addCategory);

export default productRouter;
