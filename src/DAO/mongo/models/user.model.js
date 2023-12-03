import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: { type: String, unique: true },
  age: String,
  password: String,
  cart: { type: mongoose.Schema.Types.ObjectId, ref: "carts" },
  tickets: [{ type: mongoose.Schema.Types.ObjectId, ref: "tickets" }],
  role: { type: String, enum: ["Premium", "Admin", "User"], default: "User" },
  isGithub: { type: Boolean, default: false },
});

userSchema.plugin(mongoosePaginate);

export const UserModel = mongoose.model("users", userSchema);
