import mongoose from "mongoose";

const assetsSchema = mongoose.Schema(
  {
    animal: {
      type: String,
      required: true,
      trim: true,
    },
    stockName: {
      type: String,
      required: true,
      trim: true,
    },
    unitPrice: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Assets = mongoose.model("Assets", assetsSchema);

export default Assets;
