import express from "express";
import {
  createExpense,
  getExpenses,
  deleteExpense,
} from "../controllers/expensesController.js";

const router = express.Router();

router.post("/expenses", createExpense);
router.get("/expenses", getExpenses);
router.delete("/expenses/:id", deleteExpense);

export default router;
