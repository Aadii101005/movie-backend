import express from "express";
import { getMovies, syncTMDB } from "../controllers/movieControllers.js";
import { getSeries, syncSeries } from "../controllers/seriesControllers.js";
import { verifyToken } from "../middlewares/authmiddlewares.js";

const router = express.Router();

// Protected routes for movies and series
router.get("/movies", verifyToken, getMovies);
router.post("/movies/sync", verifyToken, syncTMDB);

router.get("/series", verifyToken, getSeries);
router.post("/series/sync", verifyToken, syncSeries);

export default router;
