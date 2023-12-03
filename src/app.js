import express from "express";
import config from "./config/config.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import initializePassport from "./config/passport.config.js";
import passport from "passport";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import handlebars from "express-handlebars";
import { errorHandler } from "./middlewares/errorhandler.js";

import productRouter from "./routes/product.router.js";
import cartsRouter from "./routes/cart.router.js";
import viewsRouter from "./routes/views.router.js";
import userRouter from "./routes/user.router.js";
import sessionRouter from "./routes/session.router.js";
import ticketRouter from "./routes/ticket.router.js";
import { getProducts } from "./controllers/mocking.controller.js";
import { addLogger } from "./middlewares/logger.js";
import { connectToMongoDB } from "./utils/mongoconnect.js";
import { logger } from "./utils/logger.js";
import { cpus } from "os";
import cluster from "cluster";
import {
  CartService,
  CategoryService,
  MessageService,
  ProductService,
} from "./repositories/index.js";

const numberOfProcessors = cpus().length;

if (cluster.isPrimary) {
  logger.info(`The number of cpus is ${numberOfProcessors}`);
  console.log(config);
  for (let i = 0; i < numberOfProcessors; i++) {
    cluster.fork();
  }
} else {
  const app = express();
  app.use(addLogger);

  connectToMongoDB();

  app.use(
    session({
      store: MongoStore.create({
        mongoUrl: config.mongoURL,
        ttl: 100000,
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

  const httpServer = app.listen(config.port, () =>
    logger.info(`Worker ${process.pid} listening on port ${config.port}`)
  );
  const socketServer = new Server(httpServer);

  app.use((req, _, next) => {
    req.context = { socketServer };
    next();
  });

  app.engine("handlebars", handlebars.engine());
  app.set("views", `./src/views`);
  app.set("view engine", "handlebars");

  app.use(express.static(`./src/public`));
  app.use("/api/ticket", ticketRouter);
  app.use(`/api/products`, productRouter);
  app.use(`/api/carts`, cartsRouter);
  app.use("/api/users", userRouter);
  app.use("/api/session", sessionRouter);
  app.get("/mockingproducts", getProducts);
  app.use(`/`, viewsRouter);

  socketServer.on(`connection`, async (socket) => {
    logger.info(`Client connected to Worker ${process.pid}: ${socket.id}`);
    socket.emit(`products`, await ProductService.getAll());
    socket.emit("categories", await CategoryService.getAll());
    socket.emit(`nuevo_mensaje`, await MessageService.getAll());

    socket.on("cartId", async (cartId) => {
      const cart = await CartService.getById(cartId);
      socket.emit("cart", cart);
    });

    socket.on(`mensaje`, async (data) => {
      MessageService.create(data);
      const messages = await MessageService.getAll();
      socketServer.emit("nuevo_mensaje", messages);
    });
  });

  app.use(errorHandler);
}
