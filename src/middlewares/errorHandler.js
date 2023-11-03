import { createResponse } from "../utils.js";
export const errorHandler = (error, req, res, next) => {
  console.log(`error ${error.message}`);
  const status = error.status;
  createResponse(res, status, error.message);
};
