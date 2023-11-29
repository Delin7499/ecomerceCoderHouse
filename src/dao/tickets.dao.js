import { ticketModel } from "./mongo/ticket.model.js";
import { logger } from "../utils/logger.js";
export default class Ticket {
  getTickets = async () => {
    try {
      let tickets = await ticketModel.find().lean();
      return tickets;
    } catch (error) {
      logger.error(error);
      return null;
    }
  };

  getUserTickets = async (email) => {
    try {
      let tickets = await ticketModel.find({ purchaser: email }).lean();

      return tickets;
    } catch (error) {
      logger.error(error);
      return null;
    }
  };

  getTicketById = async (ticketId) => {
    try {
      let ticket = await ticketModel.findOne({ _id: ticketId }).lean();
      return ticket;
    } catch (error) {
      logger.error(error);
      return null;
    }
  };

  getOne = async (ticketData) => {
    try {
      let ticket = await ticketModel
        .findOne(ticketData)
        .populate("cart")
        .lean();
      return ticket;
    } catch (error) {
      logger.error(error);
      return null;
    }
  };

  createTicket = async (ticketData) => {
    try {
      let ticket = await ticketModel.create(ticketData);
      return ticket;
    } catch (error) {
      logger.error(error);
      return null;
    }
  };

  updateTicket = async (id, ticket) => {
    try {
      let update = await ticketModel.updateOne({ _id: id }, ticket);
      return update;
    } catch (error) {
      logger.error(error);
      return null;
    }
  };
}
