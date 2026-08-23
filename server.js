import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import connectDB from "./src/config/db.js";
import salesRoutes from "./src/routes/salesRoutes.js";
import expensesRoutes from "./src/routes/expensesRoutes.js";
import assetsRoutes from "./src/routes/assetsRoutes.js";
import debtsRoutes from "./src/routes/debtsRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        styleSrc: ["'self'", "https://fonts.googleapis.com", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:"],
        scriptSrc: ["'self'"],
        connectSrc: ["'self'"],
      },
    },
  })
);

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api", salesRoutes);
app.use("/api", expensesRoutes);
app.use("/api", assetsRoutes);
app.use("/api", debtsRoutes);
app.use("/api", authRoutes);

app.listen(3000, () => {
  console.log("server is running on http://localhost:3000");
});