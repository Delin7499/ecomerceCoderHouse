import { CartModel } from "./models/cart.model.js";

export default class Cart {
  async create(cartData) {
    try {
      const cart = await CartModel.create(cartData);
      return cart;
    } catch (error) {
      throw new Error("Failed to create cart");
    }
  }

  async findById(cartId) {
    try {
      const cart = await CartModel.findById(cartId)
        .populate("products.product")
        .lean();
      return cart;
    } catch (error) {
      throw new Error("Failed to find cart");
    }
  }

  async find(data) {
    try {
      const carts = await CartModel.find(data)
        .populate("products.product")
        .lean();
      return carts;
    } catch (error) {
      throw new Error("Failed to find carts");
    }
  }
  async findAll() {
    try {
      const carts = await CartModel.find().populate("products.product").lean();
      return carts;
    } catch (error) {
      throw new Error("Failed to find all carts");
    }
  }

  async update(cartId, cartData) {
    try {
      const updatedCart = await CartModel.findByIdAndUpdate(cartId, cartData, {
        new: true,
      })
        .populate("products.product")
        .lean();
      return updatedCart;
    } catch (error) {
      throw new Error("Failed to update cart");
    }
  }

  async delete(cartId) {
    try {
      await CartModel.findByIdAndDelete(cartId);
    } catch (error) {
      throw new Error("Failed to delete cart");
    }
  }
}
