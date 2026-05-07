import express from "express";
import { getSeries, syncSeries, createSeries, updateSeries, deleteSeries } from "../controllers/seriesControllers.js";

const router = express.Router();

router.get("/", getSeries);
router.post("/", createSeries);
router.put("/:id", updateSeries);
router.delete("/:id", deleteSeries);

router.post("/sync", syncSeries);

export default router;
