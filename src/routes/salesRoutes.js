import express from "express";
import { createSales, getSales } from "../controllers/salesController.js";

const router = express.Router();
router.post("/sales", createSales);
router.get("/sales", getSales);

export default router;