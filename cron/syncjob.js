import cron from "node-cron";
import { saveNetflixMoviesToDB, saveNetflixSeriesToDB } from "../services/tmdbService.js";

const runSync = async () => {
  console.log("Sync running: fetching Netflix data from TMDB...");
  try {
    const movies = await saveNetflixMoviesToDB();
    console.log(`Successfully synced ${movies.length} Netflix movies to database.`);
    
    const series = await saveNetflixSeriesToDB();
    console.log(`Successfully synced ${series.length} Netflix series to database.`);
  } catch (err) {
    console.error("Sync failed:", err);
  }
};

if (!process.env.TMDB_KEY) {
  console.warn("TMDB_KEY is not set. Sync job will not run.");
} else {
  // Run once on startup
  runSync();

  // Schedule to run every hour
  cron.schedule("0 * * * *", runSync);
}