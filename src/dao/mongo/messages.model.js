import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const messagesCollection = "messages";

const messagesSchema = mongoose.Schema({
  user: { type: String, required: true },
  message: { type: String, required: true },
});

messagesSchema.plugin(mongoosePaginate);

export const messagesModel = mongoose.model(messagesCollection, messagesSchema);
