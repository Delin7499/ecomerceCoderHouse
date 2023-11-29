import { Router } from "express";
import { getUserTickets, purchase } from "../controller/ticket.controller.js";
import Ticket from "../dao/tickets.dao.js";
import Cart from "../dao/carts.dao.js";
import Product from "../dao/products.dao.js";

const ticketDao = new Ticket();
const cartDao = new Cart();
const productDao = new Product();

const ticketRouter = Router();

ticketRouter.post("/:cartId/purchase", purchase);
ticketRouter.get("/user/:email", getUserTickets);

export default ticketRouter;
