import Sales from "../models/Sales.js";

export const createSales = async (req, res) => {
  try {
    const { name, weight, unitPrice, date } = req.body;
    const sales = await Sales.create({
      name,
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
    const sales = await Sales.find().sort({ date: -1 });
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
