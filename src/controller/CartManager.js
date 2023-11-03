import { cartsModel } from "../dao/mongo/carts.model.js";

class CartManager {
  async getCarts() {
    return cartsModel.find().populate("products.product").lean();
  }

  async getCartById(cartId) {
    try {
      const cart = await cartsModel
        .findOne({ _id: req.params.cid })
        .populate("products.product")
        .lean();
      if (cart) {
        return cart;
      } else {
        throw new Error("Error searching for cart");
      }
    } catch (error) {
      throw new Error("Error searching for cart");
    }
  }
  async createCart(products) {
    try {
      const cart = await cartsModel.create({ products });
      return cart;
    } catch (error) {
      throw new Error("Error creating new cart");
    }
  }

  async addProductToCart(cartId, productId) {
    try {
      const cart = await cartsModel.findOne({ _id: cartId }).lean();
      const oldProduct = cart.products.find(
        ({ product }) => product.toString() === productId
      );

      if (oldProduct) {
        oldProduct.quantity += 1;
      } else {
        cart.products.push({
          product: productId,
          quantity: 1,
        });
      }

      const update = await cartsModel.updateOne({ _id: cartId }, cart);
      return cart;
    } catch (error) {}
  }

  async updateProductQuantity(cartId, productId, quantity) {
    const cart = cartsModel.findOne({ _id: cartId });
    const oldProduct = cart.products.find(
      ({ product }) => product === productId
    );

    if (oldProduct) {
      oldProduct.quantity = quantity;
    } else {
      throw new Error("Error, product doenst exist in cart");
    }

    const update = await cartsModel.updateOne({ _id: cartId }, cart);
    return cart;
  }

  async deleteProductFromCart(cartId, productId) {
    const cart = await cartsModel.findOne({ _id: cartId });
    if (!cart) {
      throw new Error("Error, cart doesnt exist");
    }
    const indexToDelete = cart.products.findIndex(
      ({ product }) => (product = productId)
    );

    if (indexToDelete !== -1) {
      cart.products.splice(indexToDelete, 1);
    }
    const update = cartsModel.updateOne({ _id: cartId }, cart);
    res.send(update);
  }

  async deleteCartById(cartId) {
    await cartsModel.deleteOne({ _id: cartId });
  }
}

export default CartManager;
