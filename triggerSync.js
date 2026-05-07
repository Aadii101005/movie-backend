import { saveMoviesToDB, saveSeriesToDB } from "./services/tmdbService.js";

async function run() {
  console.log("Starting TMDB Sync...");
  try {
    const movies = await saveMoviesToDB();
    console.log(`Synced ${movies?.length || 0} movies.`);
    const series = await saveSeriesToDB();
    console.log(`Synced ${series?.length || 0} series.`);
    console.log("Done!");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

run();
