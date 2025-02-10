import mongoose from "mongoose";
import Joi from "joi";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    maxlength: 25,
    trim: true,
    match: /^[^\s]+$/,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
});

// Define the schema for user validation
const userSchema = Joi.object({
  username: Joi.string()
    .trim()
    .max(25)
    .pattern(/^(?!\s*$)(?!.*\s{2}).*$/)
    .required(),
  password: Joi.string().min(8).required(),
});

const User = mongoose.model("User", UserSchema);

export { User, userSchema };
