import { Router } from "express";

import {
  addProductToCart,
  createCart,
  deleteCart,
  getCart,
  getCarts,
  removeProductFromCart,
  updateProductQuantity,
} from "../controller/carts.controller.js";

const cartRouter = Router();

cartRouter.get("/", getCarts);

cartRouter.post("/", createCart);

cartRouter.get("/:cid", getCart);

cartRouter.post("/:cid/product/:pid", addProductToCart);

cartRouter.delete("/:cid/products/:pid", removeProductFromCart);

cartRouter.put("/:cid");

cartRouter.put("/:cid/product/:pid", updateProductQuantity);

cartRouter.delete("/:cid", deleteCart);

export default cartRouter;
