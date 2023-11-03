import { userModel } from "../dao/mongo/user.model.js";

export default class UserManager {
  async getUsers() {
    return await userModel.find().populate("cart").lean();
  }

  async getUserById(userId) {
    return await userModel.findById(userId).populate("cart").lean();
  }

  async getUserByEmail(email) {
    return await userModel.find({ email }).populate("cart").lean();
  }

  async findUser(user) {
    return await userModel.find(user).populate("cart").lean();
  }

  async createUser(first_name, last_name, email, age, password, cart) {
    const user = await userModel.create({
      first_name,
      last_name,
      email,
      age,
      password,
      cart,
    });

    return user;
  }
}
