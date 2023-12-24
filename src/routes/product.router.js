import { Router } from "express";

import {
  addCategory,
  addProduct,
  deleteProduct,
  getProductsPaginated,
  updateProduct,
  getProductById,
} from "../controllers/product.controller.js";
import { get } from "mongoose";

const productRouter = Router();

productRouter.get("/", getProductsPaginated);

productRouter.post(`/`, addProduct);
productRouter.get("/:pid", getProductById);
productRouter.delete("/:pid", deleteProduct);

productRouter.put("/:pid", updateProduct);

productRouter.post("/category/:categoryName", addCategory);

export default productRouter;
