import mongoose from "mongoose";
const salesSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    stock: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Assets",
      required: true,
    },
    weight: {
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
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);
const Sales = mongoose.model("Sales", salesSchema);

export default Sales;
