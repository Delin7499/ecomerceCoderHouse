import { logger } from "../utils/logger.js";

export const addLogger = (req, res, next) => {
  req.session.logger = logger;
  next();
};
