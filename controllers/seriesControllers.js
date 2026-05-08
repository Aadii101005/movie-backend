import { PrismaClient } from "@prisma/client";
import { saveSeriesToDB } from "../services/tmdbService.js";

const prisma = new PrismaClient();

export const getSeries = async (req, res) => {
  try {
    const series = await prisma.tvSeries.findMany();
    res.json(series);
  } catch (error) {
    console.error("Error fetching series:", error);
    res.status(500).json({ error: "Failed to fetch series" });
  }
};

export const getSeriesById = async (req, res) => {
  try {
    const { id } = req.params;
    const series = await prisma.tvSeries.findUnique({
      where: { id: parseInt(id) },
    });
    if (!series) {
      return res.status(404).json({ error: "Series not found" });
    }
    res.json(series);
  } catch (error) {
    console.error("Error fetching series by ID:", error);
    res.status(500).json({ error: "Failed to fetch series" });
  }
};

export const syncSeries = async (req, res) => {
  try {
    const series = await saveSeriesToDB();

    res.json({
      message: "Series sync successful",
      seriesSynced: series.length,
    });
  } catch (error) {
    console.error("Series sync failed:", error);
    res.status(500).json({ error: "Series sync failed" });
  }
};

export const createSeries = async (req, res) => {
  try {
    const { title, year, genre, description, poster, rating } = req.body;
    const newSeries = await prisma.tvSeries.create({
      data: {
        title,
        year: parseInt(year),
        genre,
        description,
        poster,
        rating: rating ? parseFloat(rating) : null,
      },
    });
    res.status(201).json(newSeries);
  } catch (error) {
    console.error("Error creating series:", error);
    res.status(500).json({ error: "Failed to create series" });
  }
};

export const updateSeries = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, year, genre, description, poster, rating } = req.body;
    const updatedSeries = await prisma.tvSeries.update({
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
    res.json(updatedSeries);
  } catch (error) {
    console.error("Error updating series:", error);
    res.status(500).json({ error: "Failed to update series" });
  }
};

export const deleteSeries = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.tvSeries.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: "Series deleted successfully" });
  } catch (error) {
    console.error("Error deleting series:", error);
    res.status(500).json({ error: "Failed to delete series" });
  }
};