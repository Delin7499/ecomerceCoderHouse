import { categoriesModel } from "./mongo/categories.model.js";

export default class Categorie {
  getCategories = async () => {
    try {
      let categories = await categoriesModel.find().lean();
      return categories;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  getCategorieById = async (categorieId) => {
    try {
      let categorie = await categoriesModel
        .findOne({ _id: categorieId })
        .lean();
      return categorie;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  getOne = async (categorieData) => {
    try {
      let categorie = await categoriesModel.findOne(categorieData).lean();
      return categorie;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  createcategorie = async (categorieData) => {
    try {
      let categorie = await categoriesModel.create(categorieData);
      return categorie;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
}
