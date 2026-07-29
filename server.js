import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import salesRoutes from "./src/routes/salesRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use("/api", salesRoutes);

app.listen(3000, () => {
  console.log("server is running on http://localhost:3000");
});
