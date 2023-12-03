import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const carritosSchema = new mongoose.Schema({
  products: {
    type: [
      {
        quantity: { type: Number },
        product: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
      },
    ],
    default: [],
  },
});

carritosSchema.plugin(mongoosePaginate);

export const CartModel = mongoose.model("carts", carritosSchema);
