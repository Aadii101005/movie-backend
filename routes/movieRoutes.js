import express from "express";
import { getNetflixMovies } from "../controllers/movieControllers.js";

const router = express.Router();

router.get("/netflix", getNetflixMovies);

export default router;