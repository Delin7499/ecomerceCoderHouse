import { UserModel } from "./models/user.model.js";

export default class User {
  async create(userData) {
    try {
      const user = UserModel.create(userData);
      return user;
    } catch (error) {
      throw new Error("Failed to create user");
    }
  }

  async findById(userId) {
    try {
      const user = await UserModel.findById(userId)
        .populate("cart")
        .populate("tickets")
        .lean();
      return user;
    } catch (error) {
      throw new Error("Failed to find user");
    }
  }
  findByEmail(email) {
    try {
      const user = UserModel.findOne({ email })
        .populate("cart")
        .populate("tickets")
        .lean();
      return user;
    } catch (error) {
      throw new Error("Failed to find user");
    }
  }

  async find(data) {
    try {
      const users = await UserModel.find(data)
        .populate("cart")
        .populate("tickets")
        .lean();
      return users;
    } catch (error) {
      throw new Error("Failed to find users");
    }
  }
  async findAll() {
    try {
      const users = await UserModel.find()
        .populate("cart")
        .populate("tickets")
        .lean();
      return users;
    } catch (error) {
      throw new Error("Failed to find users");
    }
  }

  async update(userId, userData) {
    try {
      const updateduser = await UserModel.findByIdAndUpdate(userId, userData, {
        new: true,
      });
      return updateduser;
    } catch (error) {
      throw new Error("Failed to update user");
    }
  }

  async delete(userId) {
    try {
      await UserModel.findByIdAndDelete(userId);
    } catch (error) {
      throw new Error("Failed to delete user");
    }
  }

  async addTicket(userEmail, ticketId) {
    try {
      const user = await UserModel.findOne({ email: userEmail });
      user.tickets.push(ticketId);
      await user.save();

      return user;
    } catch (error) {
      throw new Error("Failed to add ticket to user");
    }
  }
}
