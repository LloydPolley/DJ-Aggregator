import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { djRoutes } from "./routes/dj.routes";
import { errorHandler } from "./middleware/error.middleware";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

app.get("/health", (_req, res) => {
  res.json({ status: "ok Boy" });
});

app.use("/api/dj", djRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`My code: Server is running on port ${PORT}`);
});
