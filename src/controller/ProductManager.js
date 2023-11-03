import { productsModel } from "../dao/mongo/products.model.js";
import { categoriesModel } from "../dao/mongo/categories.model.js";

class ProductManager {
  async addProduct(
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnail
  ) {
    const producto = await productsModel.create({
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnail,
    });
    return producto;
  }

  async getProducts() {
    const productos = productsModel.find().lean().maxTimeMS(100000);
    return productos;
  }

  async deleteProductById(id) {
    console.log(id);
    productsModel.deleteOne({ _id: id }).catch(function (error) {
      console.log(error);
    });
  }

  async newCategory(categoryName) {
    const categoria = await categoriesModel.create({ name: categoryName });
    return categoria;
  }

  async getCategories() {
    const categorias = categoriesModel.find();
    return categorias;
  }
}

export default ProductManager;
