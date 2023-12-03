import { MessageModel } from "./models/message.model.js";

export default class Message {
  async create(messageData) {
    try {
      const message = MessageModel.create(messageData);
      return message;
    } catch (error) {
      throw new Error("Failed to create message");
    }
  }

  async findById(messageId) {
    try {
      const message = await MessageModel.findById(messageId).lean();
      return message;
    } catch (error) {
      throw new Error("Failed to find message by ID");
    }
  }

  async find(data) {
    try {
      const messages = await MessageModel.find(data).lean();
      return messages;
    } catch (error) {
      throw new Error("Failed to find messages");
    }
  }

  async findAll() {
    try {
      const messages = await MessageModel.find().lean();
      return messages;
    } catch (error) {
      throw new Error("Failed to find all messages");
    }
  }

  async update(messageId, updateData) {
    try {
      const updatedMessage = await MessageModel.findByIdAndUpdate(
        messageId,
        updateData,
        { new: true }
      );
      return updatedMessage;
    } catch (error) {
      throw new Error("Failed to update message");
    }
  }

  async delete(messageId) {
    try {
      await MessageModel.findByIdAndDelete(messageId);
    } catch (error) {
      throw new Error("Failed to delete message");
    }
  }
}
