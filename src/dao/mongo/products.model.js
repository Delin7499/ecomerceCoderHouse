import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productosCollectio = "products";

const productosSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
  },
});

productosSchema.plugin(mongoosePaginate);

export const productsModel = mongoose.model(
  productosCollectio,
  productosSchema
);
