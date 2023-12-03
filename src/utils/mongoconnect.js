import mongoose from "mongoose";
import config from "../config/config.js";
import { logger } from "../utils/logger.js";

const MONGODB_URI = config.mongoURL;

export const connectToMongoDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    logger.info(`Process ${process.pid} connected to MongoDB`);
  } catch (error) {
    logger.error("Error connecting to MongoDB");
    process.exit(1);
  }
};
