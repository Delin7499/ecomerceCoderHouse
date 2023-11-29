import { createResponse, errorDictionary } from "../utils.js";
import { logger } from "../utils/logger.js";

export const errorHandler = (error, req, res, next) => {
  console.log(`Error: ${error.message}`);
  logger.error(error);

  const errorCode = error.code || "UNKNOWN_ERROR";

  const errorDetails = errorDictionary[errorCode] || {
    message: "Error desconocido",
    status: 500,
  };
  const { message, status } = errorDetails;

  createResponse(res, status, { error: message });
};
