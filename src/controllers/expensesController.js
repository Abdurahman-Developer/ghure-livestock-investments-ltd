import Expenses from "../models/Expenses.js";

export const createExpense = async (req, res) => {
  try {
    const { item, category, amount, date } = req.body;
    const expenses = await Expenses.create({
      item,
      category,
      amount,
      date,
    });
    res.status(200).json({
      message: "Expense saved successfully",
      expenses,
    });
  } catch (err) {
    console.error(err, "error saving expense");
    res.status(500).json({
      message: "error saving expense",
      error: err.message,
    });
  }
};

export const getExpenses = async (req, res) => {
  try {
    const expenses = await Expenses.find().sort({ date: -1 });
    res.status(200).json({
      message: "expenses fetched successfully",
      expenses,
    });
  } catch (err) {
    console.error(err, "error getting expenses");
    res.status(500).json({
      message: "error getting expenses",
      error: err.message,
    });
  }
};

export const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await Expenses.findByIdAndDelete(id);
    res.status(200).json({ message: "Expense deleted successfully", expense });
  } catch (err) {
    console.error(err);
  }
};
