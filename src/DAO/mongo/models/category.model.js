import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const categoriasSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
});

categoriasSchema.plugin(mongoosePaginate);

export const CategoryModel = mongoose.model(
  "categories",
  new mongoose.Schema({
    name: { type: String, required: true, unique: true },
  })
);
