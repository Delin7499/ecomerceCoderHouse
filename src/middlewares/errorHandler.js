import { createResponse } from "../utils.js";
export const errorHandler = (error, req, res, next) => {
  console.log(`Error :${error.message}`);
  const status = error.status || 500;
  createResponse(res, status, error.message);
};
