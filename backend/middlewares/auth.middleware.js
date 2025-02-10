import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res
      .status(403)
      .json({ message: "No token provided - UnAuthorized" });
  }

  const token = authHeader.split(" ")[1];
  console.log("Token:", token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded:", decoded);

    const userId = decoded.user.id;
    console.log("User ID:", userId);

    req.user = await User.findById(userId).select("-password");
    console.log("User:", req.user);

    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }

    next();
  } catch (error) {
    console.error("Error:", error);
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default authMiddleware;
