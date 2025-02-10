import request from "supertest";
import jwt from "jsonwebtoken";
import app from "../../app.js";
import { User } from "../../models/user.model.js";

describe("Auth Middleware", () => {
  it("should return 403 if no token is provided", async () => {
    const res = await request(app).post("/api/currency");
    expect(res.statusCode).toEqual(403);
    expect(res.body).toHaveProperty(
      "message",
      "No token provided - UnAuthorized"
    );
  });

  it("should return 401 if token is invalid", async () => {
    const res = await request(app)
      .post("/api/currency")
      .set("Authorization", "Bearer invalidtoken");
    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty("message", "Invalid token");
  });

  it("should allow access with a valid token", async () => {
    // Mock user data
    // Create a new user in the database
    const user = new User({
      username: "Test User",
      password: "password123",
    });

    await user.save();

    // Sign token
    const token = jwt.sign({ user: { id: user._id } }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const res = await request(app)
      .post("/api/currency")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "USD", code: "USD", exRate: 0.9 })
      .expect(201);
    expect(res.statusCode).toEqual(201);
  });
});
