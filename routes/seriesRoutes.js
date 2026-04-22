import express from "express";
import { getSeries, syncSeries } from "../controllers/seriesControllers.js";

const router = express.Router();

router.get("/", getSeries);
router.post("/sync", syncSeries);

export default router;


