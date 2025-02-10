import mongoose from "mongoose";
import dotenv from "dotenv";
import { MongoMemoryServer } from "mongodb-memory-server";

dotenv.config();

let mongoServer;

export const connectDB = async () => {
  try {
    let mongoUri = process.env.MONGO_URI;

    if (process.env.NODE_ENV === "test") {
      mongoServer = await MongoMemoryServer.create();
      mongoUri = mongoServer.getUri();
    } else {
      if (!mongoUri) {
        throw new Error("MONGO_URI is not defined");
      }
    }

    const conn = await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    if (process.env.NODE_ENV === "test") {
      throw error;
    } else {
      process.exit(1);
    }
  }
};

export const closeDatabase = async () => {
  try {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    if (mongoServer) {
      await mongoServer.stop();
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    if (process.env.NODE_ENV === "test") {
      throw error;
    } else {
      process.exit(1);
    }
  }
};
