import { cartsModel } from "./mongo/carts.model.js";

export default class Cart {
  getCarts = async () => {
    try {
      let carts = await cartsModel.find().populate("products.product").lean();
      return carts;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  getCartById = async (cartId) => {
    try {
      let cart = await cartsModel
        .findOne({ _id: cartId })
        .populate("products.product")
        .lean();
      return cart;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  getOne = async (cartData) => {
    let cart = await cartsModel
      .findOne(cartData)
      .lean()
      .populate("products.product")
      .lean();
  };

  createCart = async (cartData) => {
    try {
      let cart = await cartsModel.create(cartData);
      return cart;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  updateOne = async (cartId, cart) => {
    const update = cartsModel.updateOne({ _id: cartId }, cart);
    return update;
  };
}
