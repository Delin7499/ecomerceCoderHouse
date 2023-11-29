import mongoose from "mongoose";
import config from "../../config.js";
import { logger } from "./logger.js";

const MONGODB_URI = config.mongoUrl;

export const connectToMongoDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    logger.info("Connected to MongoDB");
  } catch (error) {
    logger.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};
