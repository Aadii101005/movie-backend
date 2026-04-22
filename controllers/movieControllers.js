import { PrismaClient } from "@prisma/client";
import { saveMoviesToDB, saveSeriesToDB } from "../services/tmdbService.js";

const prisma = new PrismaClient();

export const getMovies = async (req, res) => {
  try {
    const movies = await prisma.movie.findMany();
    res.json(movies);
  } catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).json({ error: "Failed to fetch movies" });
  }
};

export const syncTMDB = async (req, res) => {
  try {
    const movies = await saveMoviesToDB();
    const series = await saveSeriesToDB();
    res.json({
      message: "Sync successful",
      moviesSynced: movies.length,
      seriesSynced: series.length,
    });
  } catch (error) {
    console.error("Manual sync failed:", error);
    res.status(500).json({ error: "Sync failed" });
  }
};