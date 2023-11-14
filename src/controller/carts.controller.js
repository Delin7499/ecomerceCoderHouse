import Cart from "../dao/carts.dao.js";

const cartDao = new Cart();

export const getCarts = async (req, res) => {
  const carts = await cartDao.getCarts();
  res.send(carts);
};

export const createCart = async (req, res) => {
  const cart = await cartDao.createCart({ products: [] });
  req.context.socketServer.emit(`carts`, await cartDao.getcarts());
};

export const getCart = async (req, res) => {
  const cart = await cartDao.getCartById(req.params.cid);
  if (cart) {
    res.status(200).send(cart.products);
  } else {
    res.status(404).send("Not found");
  }
};

export const addProductToCart = async (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  const cart = await cartDao.getCartById(cartId);
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

  const update = await cartDao.updateOne(cartId, cart);
  req.context.socketServer.emit(`carts`, await cartDao.getCarts());
  res.send(update);
};

export const removeProductFromCart = async (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  const cart = await cartDao.getCartById(cartId);
  if (!cart) {
    res.status(404).send();
    return;
  }
  console.log("se busca producto " + productId);
  console.log(cart);
  const indexToDelete = cart.products.findIndex(({ product }) => {
    console.log(product._id.toString());
    return product._id.toString() === productId;
  });
  console.log("el indice encontrado es " + indexToDelete);
  if (indexToDelete !== -1) {
    cart.products.splice(indexToDelete, 1);
  }
  const update = await cartDao.updateOne(cartId, cart);
  req.context.socketServer.emit(`cartUpdate`, cart);
  res.send(update);
};

export const setCartProducts = async (req, res) => {
  const { products } = req.body;
  const cartId = req.params.cid;
  const cart = await cartDao.getCartById(cartId);
  if (!cart) {
    res.status(404).send();
    return;
  }

  cart.products = products;
  const update = cartDao.updateOne(cartId, cart);
  res.send(update);
};

export const updateProductQuantity = async (req, res) => {
  const { quantity } = req.body;
  const cartId = req.params.cid;
  const productId = req.params.pid;
  const cart = await cartDao.getCartById(cartId);
  const oldProduct = cart.products.find(({ product }) => product === productId);

  if (oldProduct) {
    oldProduct.quantity = quantity;
  } else {
    res.status(404).send();
  }

  const update = cartDao.updateOne(cartId, cart);

  res.send(update);
};

export const deleteCart = async (req, res) => {
  const { products } = req.body;
  const cartId = req.params.cid;
  const cart = await cartDao.getCartById(cartId);
  if (!cart) {
    res.status(404).send();
    return;
  }

  cart.products = [];

  const update = cartDao.updateOne(cartId, cart);
  res.send(update);
};
