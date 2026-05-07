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

export const createMovie = async (req, res) => {
  try {
    const { title, year, genre, description, poster, rating } = req.body;
    const newMovie = await prisma.movie.create({
      data: {
        title,
        year: parseInt(year),
        genre,
        description,
        poster,
        rating: rating ? parseFloat(rating) : null,
      },
    });
    res.status(201).json(newMovie);
  } catch (error) {
    console.error("Error creating movie:", error);
    res.status(500).json({ error: "Failed to create movie" });
  }
};

export const updateMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, year, genre, description, poster, rating } = req.body;
    const updatedMovie = await prisma.movie.update({
      where: { id: parseInt(id) },
      data: {
        title,
        year: parseInt(year),
        genre,
        description,
        poster,
        rating: rating ? parseFloat(rating) : null,
      },
    });
    res.json(updatedMovie);
  } catch (error) {
    console.error("Error updating movie:", error);
    res.status(500).json({ error: "Failed to update movie" });
  }
};

export const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.movie.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: "Movie deleted successfully" });
  } catch (error) {
    console.error("Error deleting movie:", error);
    res.status(500).json({ error: "Failed to delete movie" });
  }
};