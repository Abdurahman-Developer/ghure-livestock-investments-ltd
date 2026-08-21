import express from "express";
import {
  createSales,
  getSales,
  deleteSale,
  editSale,
} from "../controllers/salesController.js";

const router = express.Router();
router.post("/sales", createSales);
router.get("/sales", getSales);
router.delete("/sales/:id", deleteSale);
router.put("/sales/:id", editSale);

export default router;
