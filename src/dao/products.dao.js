import { categoriesModel } from "./mongo/categories.model.js";
import { productsModel } from "./mongo/products.model.js";
import { logger } from "../utils/logger.js";

export default class Product {
  getProducts = async () => {
    try {
      let products = await productsModel.find().lean();
      return products;
    } catch (error) {
      logger.error(error);
      return null;
    }
  };
  getProductsPaginated = async (query, options) => {
    const products = await productsModel.paginate(query, options);

    return products;
  };

  getProductById = async (productId) => {
    try {
      let product = await productsModel.findOne({ _id: productId }).lean();
      return product;
    } catch (error) {
      logger.error(error);
      return null;
    }
  };

  getOne = async (productData) => {
    try {
      let product = await productsModel.findOne(productData).lean();
      return product;
    } catch (error) {
      logger.error(error);
      return null;
    }
  };

  createPoduct = async (productData) => {
    try {
      let product = await productsModel.create(productData);
      return product;
    } catch (error) {
      logger.error(error);
      return null;
    }
  };

  deleteProductById = async (productId) => {
    try {
      await productsModel.deleteOne({ _id: productId });
    } catch (error) {
      logger.error(error);
    }
  };

  getCategories = async () => {
    try {
      const categories = await categoriesModel.find().lean();
      return categories;
    } catch (error) {
      logger.error(error);
      return null;
    }
  };
  createCategory = async (name) => {
    try {
      await categoriesModel.create({ name });
    } catch (error) {
      logger.error(error);
    }
  };

  updateStock = async (productId, newStock) => {
    try {
      const product = await productsModel.findById(productId).lean();
      product.stock = newStock;
      const update = await productsModel.updateOne({ _id: productId }, product);
      return update;
    } catch (error) {
      logger.error(error);
    }
  };
}
