import dotenv from "dotenv";
const enviroment = process.argv[2];

const envFile = enviroment === "development" ? ".env.development" : ".env";
dotenv.config({ path: envFile });

export default {
  port: process.env.PORT,
  mongoUrl: process.env.MONGO_URL,
  adminName: process.env.ADMIN_NAME,
  adminPassword: process.env.ADMIN_PASSWORD,
};
