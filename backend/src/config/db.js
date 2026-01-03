import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(ENV.MONGODB_URI);
    console.log("Mongodb Connected");
  } catch (error) {
    console.error("Failed to connect", error);
    process.exit(1);
  }
};
