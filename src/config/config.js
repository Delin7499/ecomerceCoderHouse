import dotenv from "dotenv";
const enviroment = process.argv[2];

const envFile = enviroment === "development" ? ".env.development" : ".env";
dotenv.config({ path: envFile });

export default {
  persistence: process.env.PERSISTENCE || "FILE",
  mongoURL: process.env.MONGO_URL,
  mongoDBName: process.env.MONGO_DB_NAME,
  port: process.env.PORT || 8080,
  adminName: process.env.ADMIN_NAME,
  adminPassword: process.env.ADMIN_PASSWORD,
  mailUser: process.env.MAIL_USER,
  appPassword: process.env.APP_PASS,
};
