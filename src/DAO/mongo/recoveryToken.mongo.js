import { RecoveryTokenModel } from "./models/recoveryToken.model.js";

export default class RecoveryToken {
  async create(tokenData) {
    try {
      const token = RecoveryTokenModel.create(tokenData);
      return token;
    } catch (error) {
      throw new Error("Failed to create token");
    }
  }

  async getOne(data) {
    try {
      const token = await RecoveryTokenModel.findOne(data).lean();
      return token;
    } catch (error) {
      throw new Error("Failed to find token");
    }
  }

  deleteById(id) {
    try {
      const token = RecoveryTokenModel.findByIdAndDelete(id);
      return token;
    } catch (error) {
      throw new Error("Failed to delete token");
    }
  }
}
