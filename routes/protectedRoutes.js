import express from "express";
import { getMovies, getMovieById, syncTMDB, createMovie, updateMovie, deleteMovie } from "../controllers/movieControllers.js";
import { getSeries, getSeriesById, syncSeries, createSeries, updateSeries, deleteSeries } from "../controllers/seriesControllers.js";
import { verifyToken } from "../middlewares/authmiddlewares.js";

const router = express.Router();

// Protected routes for movies
router.get("/movies", verifyToken, getMovies);
router.get("/movies/:id", verifyToken, getMovieById);
router.post("/movies/sync", verifyToken, syncTMDB);
router.post("/movies", verifyToken, createMovie);
router.put("/movies/:id", verifyToken, updateMovie);
router.delete("/movies/:id", verifyToken, deleteMovie);

// Protected routes for series
router.get("/series", verifyToken, getSeries);
router.get("/series/:id", verifyToken, getSeriesById);
router.post("/series/sync", verifyToken, syncSeries);
router.post("/series", verifyToken, createSeries);
router.put("/series/:id", verifyToken, updateSeries);
router.delete("/series/:id", verifyToken, deleteSeries);

export default router;
