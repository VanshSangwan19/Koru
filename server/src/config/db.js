import mongoose from "mongoose";

import { config } from "./index.js";

let isConnected = false;

export async function connectDB() {
  if (isConnected) return;
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(config.mongodbUri);
    isConnected = true;
    console.log(`[db] MongoDB connected: ${mongoose.connection.host}`);
  } catch (err) {
    console.error("[db] MongoDB connection failed:", err.message);
    process.exit(1);
  }
}

export async function disconnectDB() {
  if (mongoose.connection.readyState) {
    await mongoose.connection.close();
  }
}
