import dotenv from "dotenv";
import app from "./app.js";
import { connectDB } from "./config/db.js";

dotenv.config();

// DB Connection
connectDB();

// Get the PORT from the environment or use 5000
const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
  console.log("Server started at http://localhost:" + PORT);
});
