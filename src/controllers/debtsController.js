import Debts from "../models/Debts.js";

export const saveDebts = async (req, res) => {
  try {
    const { name, amount, date } = req.body;
    const debts = await Debts.create({
      name,
      amount,
      date,
    });
    res.status(200).json({
      message: "Debts inserted succesfully",
      debts,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "error for saving message", err });
  }
};

export const getDebts = async (req, res) => {
  try {
    const debts = await Debts.find().sort({ date: -1 });
    res.status(200).json({
      message: "Debts fetched succesfully",
      debts,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "error for geting message", err });
  }
};

export const deleteDebt = async (req, res) => {
  try {
    const debt = await Debts.findByIdAndDelete(req.params.id);
    if (!debt) {
      return res.status(404).json({ message: "Debt not found" });
    }
    res.status(200).json({
      message: "Debt deleted successfully",
      debt,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "error for deleting debt", err });
  }
};

