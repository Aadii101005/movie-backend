import express from "express";
import { getMovies, syncTMDB } from "../controllers/movieControllers.js";

const router = express.Router();

router.get("/", getMovies);

router.post("/sync", syncTMDB);

export default router;