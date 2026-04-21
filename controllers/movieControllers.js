import { fetchNetflixMovies } from "../services/tmdbService.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getNetflixMovies = async (req, res) => {
  try {
    const movies = await prisma.movie.findMany();
    res.json(movies);
  } catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).json({ error: "Failed to fetch movies" });
  }
};