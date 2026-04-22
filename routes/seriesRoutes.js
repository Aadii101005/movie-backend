import express from "express";
import { getSeries } from "../controllers/movieControllers.js";

const router = express.Router();

router.get("/", getSeries);

export default router;
