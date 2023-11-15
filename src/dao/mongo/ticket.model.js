import mongoose from "mongoose";
import shortid from "shortid";
const { Schema } = mongoose;

const ticketSchema = new Schema({
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

export const ticketModel = mongoose.model("Tickets", ticketSchema);
