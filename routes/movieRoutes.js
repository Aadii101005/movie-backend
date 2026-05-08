import express from "express";
import { getMovies, getMovieById, syncTMDB, createMovie, updateMovie, deleteMovie } from "../controllers/movieControllers.js";

const router = express.Router();

router.get("/", getMovies);
router.get("/:id", getMovieById);
router.post("/", createMovie);
router.put("/:id", updateMovie);
router.delete("/:id", deleteMovie);

router.post("/sync", syncTMDB);

export default router;