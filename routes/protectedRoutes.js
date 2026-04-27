import express from "express";
import { getMovies } from "../controllers/movieControllers.js";
import { getSeries } from "../controllers/seriesControllers.js";
import { verifyToken } from "../middlewares/authmiddlewares.js";

const router = express.Router();

// Protected routes for movies and series
router.get("/movies", verifyToken, getMovies);
router.get("/series", verifyToken, getSeries);

export default router;
