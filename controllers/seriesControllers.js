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