import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cityRoutes from "./src/routes/city";
import authRoutes from "./src/routes/auth";
import { errorHandler } from "./src/middleware/errorHandler";
import { connectDB, getCachedDb } from "./src/config/db";

dotenv.config();
const PORT = process.env.PORT || 5000;

connectDB();
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

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

export default app;
