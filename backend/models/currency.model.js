import mongoose from "mongoose";
import Joi from "joi";

const CurrencySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    code: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
      unique: true,
    },
    exRate: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Define the schema for currency validation
const currencySchema = Joi.object({
  name: Joi.string().trim().min(1).max(100).required(),
  code: Joi.string().trim().uppercase().length(3).required(),
  exRate: Joi.number().min(0).required(),
});

const Currency = mongoose.model("Currency", CurrencySchema);

export { Currency, currencySchema };
