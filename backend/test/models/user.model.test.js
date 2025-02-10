import { User } from "../../models/user.model.js";

describe("User Model", () => {
  it("should create and save a user successfully", async () => {
    const validUser = new User({
      username: "John Doe",
      password: "password123",
    });
    const savedUser = await validUser.save();

    // Object Id should be defined when successfully saved to MongoDB.
    expect(savedUser._id).toBeDefined();
    expect(savedUser.name).toBe(validUser.name);
    expect(savedUser.password).toBe(validUser.password);
  });

  it("should fail to create a user without required fields", async () => {
    const userWithoutRequiredField = new User({ name: "John Doe" });
    let err;
    try {
      await userWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(Error);
    expect(err.errors).toHaveProperty("password");
  });
});
