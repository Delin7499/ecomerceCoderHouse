import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

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
    default: true,
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
    default: "https://via.placeholder.com/150",
  },
  owner: {
    type: String,
    required: true,
    default: "admin",
  },
});

productosSchema.plugin(mongoosePaginate);

export const ProductModel = mongoose.model("products", productosSchema);
