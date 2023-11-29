import { messagesModel } from "./mongo/messages.model.js";
import { logger } from "../utils/logger.js";

export default class Message {
  getMessages = async () => {
    try {
      let messages = await messagesModel.find().lean();
      return messages;
    } catch (error) {
      logger.error(error);
      return null;
    }
  };

  getMessageById = async (messageId) => {
    try {
      let message = await messagesModel.findOne({ _id: messageId }).lean();
      return message;
    } catch (error) {
      logger.error(error);
      return null;
    }
  };

  getOne = async (messageData) => {
    try {
      let message = await messagesModel.findOne(messageData).lean();
      return message;
    } catch (error) {
      logger.error(error);
      return null;
    }
  };

  createMessage = async (messageData) => {
    try {
      let message = await messagesModel.create(messageData);
      return message;
    } catch (error) {
      logger.error(error);
      return null;
    }
  };
}
