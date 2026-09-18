import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

const telegramUpdateSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    status: {
      type: String,
      default: "pending",
      enum: ["pending", "accept", "reject"],
    },
    type: {
      type: String,
      default: "phone",
      enum: ["phone", "otp"],
    },
  },
  {
    timestamps: true,
  }
);

// Prevent "Cannot overwrite model once compiled"
export const TelegramUpdate =
  models.TelegramUpdate ||
  model("TelegramUpdate", telegramUpdateSchema);