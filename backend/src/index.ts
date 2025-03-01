import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cityRoutes from "./routes/city";
import { errorHandler } from "./middleware/errorHandler";
import { connectDB } from "./config/db";

dotenv.config();
const PORT = process.env.PORT || 5000;

connectDB();
const app = express();

app.use(cors());
app.use(express.json());
app.use(errorHandler);

app.use("/cities", cityRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
