import { createErrorResponse } from "../utils.js";
import { CartService } from "../repositories/index.js";

export const getAll = async (_, res) => {
  const carts = await CartService.getAll();
  res.status(200).send(carts);
};

export const createCart = async (req, res) => {
  try {
    const cart = await CartService.create({ products: [] });
    req.context.socketServer.emit(`carts`, await CartService.getAll());
  } catch (error) {
    const errorCode = error.code || "CART_CREATE_ERROR";
    createErrorResponse(res, errorCode);
  }
};

export const getCart = async (req, res) => {
  try {
    const cart = await CartService.getById(req.params.cid);
    if (cart) {
      res.status(200).send(cart.products);
    } else {
      res.status(404).send("Not found");
    }
  } catch (error) {
    const errorCode = error.code || "CART_NOT_FOUND";
    createErrorResponse(res, errorCode);
  }
};

export const addProductToCart = async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const cart = await CartService.getById(cartId);
    const oldProduct = cart.products.find(
      ({ product }) => product._id == productId
    );
    if (oldProduct) {
      oldProduct.quantity += 1;
    } else {
      cart.products.push({
        product: productId,
        quantity: 1,
      });
    }

    const update = await CartService.update(cartId, cart);
    req.context.socketServer.emit(`carts`, await CartService.getAll());
    res.send(update);
  } catch (error) {
    const errorCode = error.code || "CART_ADD_ERROR";
    createErrorResponse(res, errorCode);
  }
};

export const removeProductFromCart = async (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  const cart = await CartService.getById(cartId);
  if (!cart) {
    res.status(404).send();
    return;
  }
  const indexToDelete = cart.products.findIndex(({ product }) => {
    return product._id.toString() === productId;
  });
  if (indexToDelete !== -1) {
    cart.products.splice(indexToDelete, 1);
  }
  const update = await CartService.update(cartId, cart);
  req.context.socketServer.emit(`cartUpdate`, cart);
  res.send(update);
};

export const setCartProducts = async (req, res) => {
  const { products } = req.body;
  const cartId = req.params.cid;
  const cart = await CartService.getById(cartId);
  if (!cart) {
    res.status(404).send();
    return;
  }

  cart.products = products;
  const update = Cart;
  res.send(update);
};

export const updateProductQuantity = async (req, res) => {
  const { quantity } = req.body;
  const cartId = req.params.cid;
  const productId = req.params.pid;
  const cart = await CartService.getById(cartId);
  const oldProduct = cart.products.find(({ product }) => product === productId);

  if (oldProduct) {
    oldProduct.quantity = quantity;
  } else {
    res.status(404).send();
  }

  const update = CartService.update(cartId, cart);

  res.send(update);
};

export const deleteCart = async (req, res) => {
  const { products } = req.body;
  const cartId = req.params.cid;
  const cart = await CartService.getById(cartId);
  if (!cart) {
    res.status(404).send();
    return;
  }

  cart.products = [];

  const update = CartService.update(cartId, cart);
  res.send(update);
};
