import { Router } from "express";
import { getUserTickets, purchase } from "../controllers/ticket.controller.js";

const ticketRouter = Router();

ticketRouter.post("/:cartId/purchase", purchase);
ticketRouter.get("/user/:email", getUserTickets);

export default ticketRouter;
