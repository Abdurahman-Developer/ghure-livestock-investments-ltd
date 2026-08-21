import express from "express";
import {
  createAsset,
  getAssets,
  deleteAsset,
} from "../controllers/asetsController.js";

const router = express.Router();

router.post("/livestock-assets", createAsset);
router.get("/livestock-assets", getAssets);
router.delete("/livestock-assets/:id", deleteAsset);

export default router;
