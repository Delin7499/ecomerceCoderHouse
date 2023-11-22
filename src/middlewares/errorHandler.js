import { createResponse, errorDictionary } from "../utils.js";

export const errorHandler = (error, req, res, next) => {
  console.log(`Error: ${error.message}`);

  const errorCode = error.code || "UNKNOWN_ERROR";

  const errorDetails = errorDictionary[errorCode] || {
    message: "Error desconocido",
    status: 500,
  };
  const { message, status } = errorDetails;

  createResponse(res, status, { error: message });
};
