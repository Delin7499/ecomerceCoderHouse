import mongoose from "mongoose";
import shortid from "shortid";

const ticketSchema = new mongoose.Schema({
  code: {
    type: String,
    unique: true,
    default: () => shortid.generate(),
  },
  purchase_datetime: {
    type: Date,
    default: Date.now,
  },
  amount: {
    type: Number,
    required: true,
  },
  purchaser: {
    type: String,
    required: true,
  },
});

export const TicketModel = mongoose.model("tickets", ticketSchema);
