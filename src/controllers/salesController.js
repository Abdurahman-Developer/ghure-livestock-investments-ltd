import Sales from "../models/Sales.js";

export const createSales = async (req, res) => {
  try {
    const { name, stock, weight, unitPrice, date } = req.body;
    const sales = await Sales.create({
      name,
      stock,
      weight,
      unitPrice,
      date,
    });
    res.status(200).json({
      message: "Sales saved successfully",
      sales,
    });
  } catch (err) {
    console.error(err, "error saving sales");
    res.status(500).json({
      message: "error saving sales",
      error: err.message,
    });
  }
};

export const getSales = async (req, res) => {
  try {
    const sales = await Sales.find()
      .populate("stock", "stockName")
      .sort({ date: -1 });
    res.status(200).json({
      message: "sales fetched succesfully",
      sales,
    });
  } catch (err) {
    console.error(err, "error geting sales");
    res.status(500).json({
      message: "error geting sales",
      error: err.message,
    });
  }
};

export const deleteSale = async (req, res) => {
  try {
    const sale = await Sales.findByIdAndDelete(req.params.id);
    if (!sale) {
      return res.status(404).json({ message: "Sale not found" });
    }
    res.status(200).json({
      message: "Sale deleted Successfully",
      sale,
    });
  } catch (err) {
    console.error(err, "error deleting sales");
    res.status(500).json({
      message: "error deleting sales",
      error: err.message,
    });
  }
};

export const editSale = async (req, res) => {
  try {
    const { name, weight, unitPrice, date } = req.body;
    const sale = await Sales.findByIdAndUpdate(
      req.params.id,
      { name, weight, unitPrice, date },
      { new: true, runValidators: true }
    );
    if (!sale) {
      return res.status(404).json({ message: "Sale not found" });
    }
    res.status(200).json({
      message: "Sale updated successfully",
      sale,
    });
  } catch (err) {
    console.error(err, "error updating sale");
    res.status(500).json({
      message: "error updating sale",
      error: err.message,
    });
  }
};
