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

app.get("/", (req, res) => {
  const cachedDb = getCachedDb();
  if (cachedDb) {
    res.status(200).json({ message: "Default connection API is working" });
  } else {
    res.status(500).json({ error: "Default connection API is not available" });
  }
});

app.use("/api/v1/cities", cityRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/game", gameRoutes);

const startServer = async () => {
  try {
    await ConnectDB();
    app.listen(PORT, () => logger(`Server running on port ${PORT}`));
  } catch (error) {
    logger("Server startup failed:" + error);
    process.exit(1);
  }
};

startServer();

export default app;
