import cron from "node-cron";
import { fetchNetflixMovies } from "../services/tmdbService.js";

if (!process.env.TMDB_KEY) {
  console.warn("TMDB_KEY is not set. Cron sync job will not run.");
} else {
  cron.schedule("0 * * * *", async () => {
    console.log("Cron sync running: fetching Netflix data from TMDB...");
    try {
      const movies = await fetchNetflixMovies();
      console.log(`Fetched ${movies.length} Netflix titles from TMDB.`);
    } catch (err) {
      console.error("Cron sync failed:", err);
    }
  });
}