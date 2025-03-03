import mongoose, { Connection } from "mongoose";
import { logger } from "../utils/logger";
import dotenv from "dotenv";

dotenv.config();
const URI = process.env.MONGODB_URI || "";
const DbName = process.env.Db_Name || "";

let cachedDb: Connection | null = null;

async function connectDB(): Promise<void> {
  if (!URI) {
    logger("Error: MONGODB_URI environment variable is missing.");
    process.exit(1);
  }

  if (cachedDb) {
    logger("Using cached database connection.");
    return;
  }

  try {
    const connection = await mongoose.connect(URI, { dbName: DbName });
    cachedDb = connection.connection;
    logger("Successfully connected to the database.");
  } catch (error) {
    logger("Failed to connect to database: " + error);
    process.exit(1); 
  }
}

function getCachedDb(): Connection | null {
  if (!cachedDb) {
    logger("⚠️ Database connection is not established.");
    return null; 
  }
  return cachedDb;
}

async function closeCachedDb(): Promise<void> {
  if (cachedDb) {
    await cachedDb.close();
    logger("Database connection closed.");
  }
}

export { connectDB, getCachedDb, closeCachedDb };
