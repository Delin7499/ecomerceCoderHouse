import { Router } from "express";

import {
  addProductToCart,
  createCart,
  deleteCart,
  getAll,
  getCart,
  removeProductFromCart,
  updateProductQuantity,
} from "../controllers/cart.controller.js";

const cartRouter = Router();

cartRouter.get("/", getAll);

cartRouter.post("/", createCart);

cartRouter.get("/:cid", getCart);

cartRouter.post("/:cid/product/:pid", addProductToCart);

cartRouter.delete("/:cid/products/:pid", removeProductFromCart);

cartRouter.put("/:cid");

cartRouter.put("/:cid/product/:pid", updateProductQuantity);

cartRouter.delete("/:cid", deleteCart);

export default cartRouter;
