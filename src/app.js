import express from "express";
import config from "../config.js";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
import initializePassport from "./config/passport.config.js";
import passport from "passport";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import handlebars from "express-handlebars";
import { errorHandler } from "./middlewares/errorhandler.js";

import productRouter from "./routes/productRouter.js";
import cartsRouter from "./routes/cartRouter.js";
import viewsRouter from "./routes/viewsRouter.js";
import userRouter from "./routes/userRouter.js";
import sessionRouter from "./routes/sessionRouter.js";
import Product from "./dao/products.dao.js";
import Cart from "./dao/carts.dao.js";
import Message from "./dao/messages.dao.js";

const productDao = new Product();
const cartDao = new Cart();
const messageDao = new Message();

const app = express();

console.log(config);

mongoose.connect(config.mongoUrl);

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: config.mongoUrl,
      ttl: 1000000,
    }),
    secret: "coderSectret",
    resave: false,
    saveUninitialized: false,
  })
);

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use(cookieParser("CoderSecurity"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const httpServer = app.listen(config.port, () => console.log("Running..."));
const socketServer = new Server(httpServer);

app.use((req, res, next) => {
  req.context = { socketServer };
  next();
});

app.engine("handlebars", handlebars.engine());
app.set("views", `./src/views`);
app.set("view engine", "handlebars");

app.use(express.static(`./src/public`));

app.use(`/api/products`, productRouter);
app.use(`/api/carts`, cartsRouter);
app.use("/api/users", userRouter);
app.use("/api/session", sessionRouter);
app.use(`/`, viewsRouter);

socketServer.on(`connection`, async (socket) => {
  console.log(`Se conecto el usuario con id: ${socket.id}`);
  socket.emit(`products`, await productDao.getProducts());
  socket.emit("categories", await productDao.getCategories());
  socket.emit(`nuevo_mensaje`, await messageDao.getMessages());

  socket.on("cartId", async (cartId) => {
    const cart = await cartDao.getCartById(cartId);
    socket.emit("cart", cart);
  });

  socket.on(`mensaje`, async (data) => {
    messageDao.createMessage(data);
    const messages = await messageDao.getMessages();
    socketServer.emit("nuevo_mensaje", messages);
  });
});

app.use(errorHandler);
