import Assets from "../models/Assets.js";

export const createAsset = async (req, res) => {
  try {
    const { stockName, animal, unitPrice, date } = req.body;
    const assets = await Assets.create({
      animal,
      stockName,
      unitPrice,
      date,
    });
    res.status(200).json({
      message: "Asset saved successfully",
      assets,
    });
  } catch (err) {
    console.error(err, "error saving asset");
    res.status(500).json({
      message: "error saving asset",
      error: err.message,
    });
  }
};

export const getAssets = async (req, res) => {
  try {
    const assets = await Assets.find().sort({ date: -1 });
    res.status(200).json({
      message: "assets fetched successfully",
      assets,
    });
  } catch (err) {
    console.error(err, "error getting assets");
    res.status(500).json({
      message: "error getting assets",
      error: err.message,
    });
  }
};

export const deleteAsset = async (req, res) => {
  try {
    const { id } = req.params;
    const assets = await Assets.findByIdAndDelete(id);
    res.status(200).json({
      message: "asset deleted succesgfully",
      assets,
    });
  } catch (err) {
    console.error(err, "error deleting assets");
    res.status(500).json({
      message: "error deleting assets",
      error: err.message,
    });
  }
};
