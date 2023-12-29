import { ProductModel } from "./models/product.model.js";

export default class Product {
  async create(productData) {
    try {
      const product = ProductModel.create(productData);
      return product;
    } catch (error) {
      throw new Error("Failed to create product");
    }
  }

  async findById(productId) {
    try {
      const product = await ProductModel.findById(productId).lean();
      return product;
    } catch (error) {
      throw new Error("Failed to find product");
    }
  }

  async find(data) {
    try {
      const products = await ProductModel.find(data).lean();
      return products;
    } catch (error) {
      throw new Error("Failed to find products");
    }
  }
  async findAll() {
    try {
      const products = await ProductModel.find().lean();
      return products;
    } catch (error) {
      throw new Error("Failed to find products");
    }
  }
  async findAllPaginated(query, options) {
    try {
      const products = await ProductModel.paginate(query, options);
      return products;
    } catch (error) {
      throw new Error("Failed to find products");
    }
  }

  async update(productId, productData) {
    try {
      const updatedProduct = await ProductModel.findByIdAndUpdate(
        productId,
        productData,
        { new: true }
      );
      return updatedProduct;
    } catch (error) {
      throw new Error("Failed to update product");
    }
  }

  async delete(productId) {
    try {
      await ProductModel.findByIdAndDelete(productId).exec();
    } catch (error) {
      console.log(error);
      throw new Error("Failed to delete product");
    }
  }
}
