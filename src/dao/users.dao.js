import { userModel } from "./mongo/user.model.js";

export default class User {
  getUsers = async () => {
    try {
      let users = await userModel.find().populate("cart").lean();
      return users;
    } catch (error) {
      logger.error(error);
      return null;
    }
  };

  getUserById = async (userId) => {
    try {
      let user = await userModel
        .findOne({ _id: userId })
        .populate("cart")
        .lean();

      return user;
    } catch (error) {
      logger.error(error);
      return null;
    }
  };
  getUserByEmail = async (userEmail) => {
    try {
      let user = await userModel
        .findOne({ email: userEmail })
        .populate("cart")
        .lean();
      return user;
    } catch (error) {
      logger.error(error);
      return null;
    }
  };

  getOne = async (userData) => {
    try {
      let user = await userModel.findOne(userData).populate("cart").lean();

      return user;
    } catch (error) {
      logger.error(error);
      return null;
    }
  };

  createUser = async (userData) => {
    try {
      let user = await userModel.create(userData);
      return user;
    } catch (error) {
      logger.error(error);
      return null;
    }
  };

  updateUser = async (id, user) => {
    try {
      let update = await userModel.updateOne({ _id: id }, user);
      return update;
    } catch (error) {
      logger.error(error);
      return null;
    }
  };
}
