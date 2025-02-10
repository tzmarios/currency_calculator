// tests/setupTests.js
import { connectDB, closeDatabase } from "../config/db.js";

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await closeDatabase();
});
