import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cityRoutes from "./routes/city";
import authRoutes from "./routes/auth";
import gameRoutes from "./routes/game";
import { errorHandler } from "./middleware/errorHandler";
import { ConnectDB, getCachedDb } from "./config/db";
import { logger } from "./utils/logger";

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(errorHandler);

app.get("/", async (req, res) => {
  try {
    await ConnectDB();
    const cachedDb = getCachedDb();
    if (cachedDb) {
      res.status(200).json({ message: "Default connection API is working" });
    } else {
      res.status(500).json({ error: "Database connection is not available" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error });
  }
});

app.use("/api/v1/cities", cityRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/game", gameRoutes);

app.listen(PORT, () => logger(`Server running on port ${PORT}`));
