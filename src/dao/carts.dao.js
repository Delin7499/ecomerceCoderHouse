import { cartsModel } from "./mongo/carts.model.js";
import { logger } from "../utils/logger.js";

export default class Cart {
  getCarts = async () => {
    try {
      let carts = await cartsModel.find().populate("products.product").lean();
      return carts;
    } catch (error) {
      logger.error(error);
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
      logger.error(error);
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
      logger.error(error);
      return null;
    }
  };
  updateOne = async (cartId, cart) => {
    try {
      const update = cartsModel.updateOne({ _id: cartId }, cart);
      return update;
    } catch (error) {
      logger.error(error);
    }
  };

  updateCart = async (cartId, updatedFields) => {
    try {
      const updatedCart = await cartsModel
        .findByIdAndUpdate(cartId, updatedFields, {
          new: true,
          useFindAndModify: false,
        })
        .populate("products.product");

      if (!updatedCart) {
        throw new Error("Cart not found");
      }

      return updatedCart;
    } catch (error) {
      throw error;
    }
  };
}
