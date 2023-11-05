import mongoose, { mongo } from "mongoose";

const userCollection = "users";

const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: { type: String, unique: true },
  age: String,
  password: String,
  cart: { type: mongoose.Schema.Types.ObjectId, ref: "carts" },
  role: { type: String, default: "user" },
  isGithub: { type: Boolean, default: false },
});

const userModel = mongoose.model(userCollection, userSchema);

export { userModel };
