import express from "express";
import {
  saveDebts,
  getDebts,
  deleteDebt,
} from "../controllers/debtsController.js";

const router = express.Router();
router.post("/debts", saveDebts);
router.get("/debts", getDebts);
router.delete("/debts/:id", deleteDebt);

export default router;
