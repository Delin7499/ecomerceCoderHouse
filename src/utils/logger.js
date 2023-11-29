import winston from "winston";

const developmentLogger = winston.createLogger({
  level: "debug",
  format: winston.format.simple(),
  transports: [new winston.transports.Console()],
});

const productionLogger = winston.createLogger({
  level: "info",
  format: winston.format.simple(),
  transports: [
    new winston.transports.File({ filename: "errors.log", level: "error" }),
  ],
});
const enviroment = process.argv[2];
export const logger =
  enviroment === "production" ? productionLogger : developmentLogger;
