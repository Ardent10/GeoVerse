import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cityRoutes from "./routes/city";
import authRoutes from "./routes/auth";
import { errorHandler } from "./middleware/errorHandler";
import { connectDB } from "./config/db";

dotenv.config();
const PORT = process.env.PORT || 5000;

connectDB();
const app = express();

app.use(cors());
app.use(express.json());
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("🚀 Server is up and running!");
});

app.use("/api/v1/cities", cityRoutes);
app.use("/api/v1/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

export default app;
