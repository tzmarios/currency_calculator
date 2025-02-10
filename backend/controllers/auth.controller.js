import bcrypt from "bcrypt";
import { User, userSchema } from "../models/user.model.js";
import jwt from "jsonwebtoken";

/**
 * @typedef {Object} IUser
 * @property {string} _id
 * @property {string} username
 * @property {string} password
 */

const registerUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Please enter all fields" });
  }

  if (username.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Username cannot be empty or only whitespace characters",
    });
  }

  if (username.length > 25) {
    return res.status(400).json({
      success: false,
      message: "Username must be less than 25 characters",
    });
  }

  const passwordReg =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!passwordReg.test(password)) {
    return res.status(400).json({
      success: false,
      message:
        "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and one special character",
    });
  }

  // Validate user input with Joi - PromptModal Message will be displayed if validation fails
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message.replace(/['"]+/g, ""),
    });
  }

  /** @type {IUser | null} **/
  const userExists = await User.findOne({ username });

  if (userExists) {
    return res.status(400).json({
      success: false,
      message: "User with that username already exists",
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    /** @type {IUser | null} **/
    const newUser = new User({ username, password: hashedPassword });

    const result = await newUser.save();

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      ...result._doc,
      password: null,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Please enter all fields" });
  }

  try {
    /** @type {IUser | null} **/
    const userExists = await User.findOne({ username });

    if (!userExists) {
      return res
        .status(400)
        .json({ success: false, message: "User does not exist" });
    }

    const passwordMatch = await bcrypt.compare(password, userExists.password);
    if (!passwordMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    const payload = {
      user: {
        id: userExists._id,
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.status(200).json({
      success: true,
      message: `User: ${userExists.username} logged in successfully`,
      token,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const authCtrl = { registerUser, loginUser };
