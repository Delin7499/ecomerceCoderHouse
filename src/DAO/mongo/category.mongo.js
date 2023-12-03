import { CategoryModel } from "./models/category.model.js";

export default class Category {
  async create(categoryData) {
    try {
      const category = CategoryModel.create(categoryData);
      return category;
    } catch (error) {
      throw new Error("Failed to create category");
    }
  }

  async findById(categoryId) {
    try {
      const category = await CategoryModel.findById(categoryId).lean();
      return category;
    } catch (error) {
      throw new Error("Failed to find category");
    }
  }

  async find(data) {
    try {
      const categories = await CategoryModel.find(data).lean();
      return categories;
    } catch (error) {
      throw new Error("Failed to find categories");
    }
  }

  async findAll() {
    try {
      const categories = await CategoryModel.find().lean();
      return categories;
    } catch (error) {
      throw new Error("Failed to find categories");
    }
  }

  async update(categoryId, categoryData) {
    try {
      const updatedCategory = await CategoryModel.findByIdAndUpdate(
        categoryId,
        categoryData,
        { new: true }
      );
      return updatedCategory;
    } catch (error) {
      throw new Error("Failed to update category");
    }
  }

  async delete(categoryId) {
    try {
      await CategoryModel.findByIdAndDelete(categoryId);
    } catch (error) {
      throw new Error("Failed to delete category");
    }
  }
}
