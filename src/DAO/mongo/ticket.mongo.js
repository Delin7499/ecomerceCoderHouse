import { TicketModel } from "./models/ticket.model.js";

export default class Ticket {
  async create(ticketData) {
    try {
      const ticket = TicketModel.create(ticketData);
      return ticket;
    } catch (error) {
      throw new Error("Failed to create ticket");
    }
  }

  async findById(ticketId) {
    try {
      const ticket = await TicketModel.findById(ticketId).lean();
      return ticket;
    } catch (error) {
      throw new Error("Failed to find ticket");
    }
  }

  async find(data) {
    try {
      const tickets = await TicketModel.find(data).lean();
      return tickets;
    } catch (error) {
      throw new Error("Failed to find tickets");
    }
  }
  async findAll() {
    try {
      const tickets = await TicketModel.find().lean();
      return tickets;
    } catch (error) {
      throw new Error("Failed to find tickets");
    }
  }

  async update(ticketId, ticketData) {
    try {
      const updatedticket = await TicketModel.findByIdAndUpdate(
        ticketId,
        ticketData,
        { new: true }
      );
      return updatedticket;
    } catch (error) {
      throw new Error("Failed to update ticket");
    }
  }

  async delete(ticketId) {
    try {
      await TicketModel.findByIdAndDelete(ticketId);
    } catch (error) {
      throw new Error("Failed to delete ticket");
    }
  }
}
