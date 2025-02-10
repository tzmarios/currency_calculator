import request from "supertest";
import app from "../../app.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { Currency } from "../../models/currency.model.js";
import { User } from "../../models/user.model.js";

describe("Currency Controller", () => {
  let token;

  beforeAll(async () => {
    // Create a new user in the database
    const user = new User({
      username: "Test User",
      password: "password123",
    });

    // Hash the password if your User model uses pre-save hooks
    await user.save();

    await new Currency({ name: "EUR", code: "EUR", exRate: 1 }).save();

    // Generate a valid token for testing using the user's actual ID
    token = jwt.sign({ user: { id: user._id } }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
  });

  it("should add a currency", async () => {
    const response = await request(app)
      .post("/api/currency")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "USD", code: "USD", exRate: 0.9 })
      .expect(201);

    expect(response.body).toHaveProperty("data","USD");
  });

  it("should get all currencies", async () => {
    await new Currency({ name: "YEN", code: "YEN", exRate: 52.0 }).save();
    const response = await request(app).get("/api/currency").expect(200);

    expect(response.body.data).toBeInstanceOf(Array);
    expect(response.body.data.length).toBeGreaterThan(2);
  });

  it("should get a specific currency", async () => {
    const currency = await Currency.findOne({ name: "EUR" });
    const response = await request(app)
      .get(`/api/currency/${currency._id}`)
      .expect(200);

    expect(response.body).toHaveProperty("data.code", "EUR");
  });

  it("should return 404 for a non-existent currency", async () => {
    const nonExistentId = new mongoose.Types.ObjectId();
    const response = await request(app)
      .get(`/api/currency/${nonExistentId}`)
      .expect(404);

    expect(response.body).toHaveProperty("message", "Currency not found.");
  });

  it("should delete a currency", async () => {
    const currency = await new Currency({
      name: "JPY",
      code: "JPY",
      exRate: 110.0,
    }).save();
    const response = await request(app)
      .delete(`/api/currency/${currency._id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    expect(response.body).toHaveProperty("message", `Currency ${currency.code} deleted.`);

    const checkResponse = await request(app)
      .get(`/api/currency/${currency._id}`)
      .expect(404);

    expect(checkResponse.body).toHaveProperty("message", "Currency not found.");
  });

  it("should convert currency", async () => {
    const response = await request(app)
      .post("/api/currency/convert")
      .set("Authorization", `Bearer ${token}`)
      .send({ fromCurrency: "USD", toCurrency: "EUR", amount: 100 })
      .expect(200);

    expect(response.body).toHaveProperty("data");
    expect(response.body.data.convertedAmount).toBeCloseTo(111.111);
  });

  it("should return 404 for non-existent currency pair in conversion", async () => {
    const response = await request(app)
      .post("/api/currency/convert")
      .set("Authorization", `Bearer ${token}`)
      .send({ fromCurrency: "USD", toCurrency: "GBP", amount: 100 })
      .expect(404);

    expect(response.body).toHaveProperty("message", "Currency pair not found.");
  });
});
