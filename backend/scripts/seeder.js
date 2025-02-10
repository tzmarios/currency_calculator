import dotenv from "dotenv";
import { connectDB } from "../config/db.js";
import { Currency } from "../models/currency.model.js";

dotenv.config();

const currencies = [
  {
    name: "Euro",
    code: "EUR",
    exRate: 1.0,
  },
  {
    name: "US Dollar",
    code: "USD",
    exRate: 1.1,
  },
  {
    name: "British Pound",
    code: "GBP",
    exRate: 0.85,
  },
  {
    name: "Japanese Yen",
    code: "JPY",
    exRate: 130.0,
  },
  {
    name: "Swiss Franc",
    code: "CHF",
    exRate: 1.05,
  },
];

const importData = async () => {
  try {
    await connectDB();

    await Currency.deleteMany();

    await Currency.insertMany(currencies);

    console.log("Currencies Imported!");
    process.exit();
  } catch (error) {
    console.error("Error: ${error.message}");
    process.exit(1);
  }
};

importData();
