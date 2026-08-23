import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./src/config/db.js";
import salesRoutes from "./src/routes/salesRoutes.js";
import expensesRoutes from "./src/routes/expensesRoutes.js";
import assetsRoutes from "./src/routes/assetsRoutes.js";
import debtsRoutes from "./src/routes/debtsRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";

dotenv.config();
connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

// API routes
app.use("/api", salesRoutes);
app.use("/api", expensesRoutes);
app.use("/api", assetsRoutes);
app.use("/api", debtsRoutes);
app.use("/api", authRoutes);

// Serve the built React app
app.use(express.static(path.join(__dirname, "dist")));

// Catch-all: send index.html for any non-API route (so client-side routing works)
app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
