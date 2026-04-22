import cron from "node-cron";
import { saveMoviesToDB, saveSeriesToDB } from "../services/tmdbService.js";

const runSync = async () => {
  console.log("Sync running: fetching data from TMDB...");
  try {
    const movies = await saveMoviesToDB();
    console.log(`Successfully synced ${movies.length} movies to database.`);
    
    const series = await saveSeriesToDB();
    console.log(`Successfully synced ${series.length} series to database.`);
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
  console.log("Sync job scheduled to run every hour");
  
}