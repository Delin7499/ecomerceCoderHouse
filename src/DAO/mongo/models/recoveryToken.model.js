import mongoose from "mongoose";
const recoveryTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  user: {
    type: "String",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600,
  },
});

export const RecoveryTokenModel = mongoose.model(
  "RecoveryTokens",
  recoveryTokenSchema
);
