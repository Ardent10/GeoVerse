import mongoose, { Connection, Mongoose } from "mongoose";
import { logger } from "../utils/logger";

const URI = process.env.MONGODB_URI || ""; // Replace with your MongoDB connection string
const DbName = process.env.Db_Name; // Replace with your database name

let cachedDb: Connection | null = null;

export async function ConnectDB(): Promise<void> {
  try {
    if (!URI) {
      throw new Error("MONGODB_URI environment variable is not defined");
    }

    if (cachedDb) {
      logger("Using cached database connection");
      return;
    }

    await mongoose.connect(URI, {
      dbName: DbName,
    });

    cachedDb = mongoose.connection;
    logger("Connected successfully to the database");
  } catch (error) {
    logger("Failed to connect to the database:" + error);
    throw error;
  }
}

export function getCachedDb(): Connection {
  if (!cachedDb) {
    throw new Error("Database connection has not been established");
  }
  return cachedDb;
}

export function closeCachedDb(): Promise<void> {
  if (cachedDb) {
    return cachedDb.close();
  }
  return Promise.resolve();
}
