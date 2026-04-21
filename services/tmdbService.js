import axios from "axios";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const fetchNetflixMovies = async () => {
  // Using popular movies to get a wider variety
  const res = await axios.get(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_KEY}`
  );

  const movies = res.data.results;
  let netflixMovies = [];

  for (let movie of movies) {
    const providerRes = await axios.get(
      `https://api.themoviedb.org/3/movie/${movie.id}/watch/providers?api_key=${process.env.TMDB_KEY}`
    );

    const results = providerRes.data.results || {};
    // Check IN (India) or US as fallback
    const providers = [
      ...(results.IN?.flatrate || []),
      ...(results.US?.flatrate || [])
    ];

    const isNetflix = providers.some(p => p.provider_name === "Netflix");

    if (isNetflix) {
      // Check if already in list to avoid duplicates from multiple regions
      if (!netflixMovies.find(m => m.id === movie.id)) {
        netflixMovies.push(movie);
      }
    }
  }

  
  return netflixMovies;
};

export const saveNetflixMoviesToDB = async () => {
  try {
    const netflixMovies = await fetchNetflixMovies();
    
    for (let movie of netflixMovies) {
      await prisma.movie.upsert({
        where: { externalId: String(movie.id) },
        update: {
          title: movie.title || movie.original_title,
          description: movie.overview,
          year: new Date(movie.release_date).getFullYear() || new Date().getFullYear(),
          genre: "Movie",
          poster: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null,
          rating: movie.vote_average,
        },
        create: {
          title: movie.title || movie.original_title,
          description: movie.overview,
          year: new Date(movie.release_date).getFullYear() || new Date().getFullYear(),
          genre: "Movie",
          poster: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null,
          rating: movie.vote_average,
          externalId: String(movie.id),
        },
      });
    }
    
    console.log(`Successfully saved ${netflixMovies.length} Netflix movies to database.`);
    return netflixMovies;
  } catch (error) {
    console.error("Error saving movies to database:", error);
    throw error;
  }
};

export const fetchNetflixSeries = async () => {
  const res = await axios.get(
    `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.TMDB_KEY}`
  );

  const series = res.data.results;
  let netflixSeries = [];

  for (let s of series) {
    const providerRes = await axios.get(
      `https://api.themoviedb.org/3/tv/${s.id}/watch/providers?api_key=${process.env.TMDB_KEY}`
    );

    const results = providerRes.data.results || {};
    const providers = [
      ...(results.IN?.flatrate || []),
      ...(results.US?.flatrate || [])
    ];

    const isNetflix = providers.some(p => p.provider_name === "Netflix");

    if (isNetflix) {
      if (!netflixSeries.find(item => item.id === s.id)) {
        netflixSeries.push(s);
      }
    }
  }
  
  return netflixSeries;
};

export const saveNetflixSeriesToDB = async () => {
  try {
    const netflixSeries = await fetchNetflixSeries();
    
    for (let s of netflixSeries) {
      await prisma.tvSeries.upsert({
        where: { externalId: String(s.id) },
        update: {
          title: s.name || s.original_name,
          description: s.overview,
          year: new Date(s.first_air_date).getFullYear() || new Date().getFullYear(),
          genre: "TV Series",
          poster: s.poster_path ? `https://image.tmdb.org/t/p/w500${s.poster_path}` : null,
          rating: s.vote_average,
        },
        create: {
          title: s.name || s.original_name,
          description: s.overview,
          year: new Date(s.first_air_date).getFullYear() || new Date().getFullYear(),
          genre: "TV Series",
          poster: s.poster_path ? `https://image.tmdb.org/t/p/w500${s.poster_path}` : null,
          rating: s.vote_average,
          externalId: String(s.id),
        },
      });
    }
    
    console.log(`Successfully saved ${netflixSeries.length} Netflix series to database.`);
    return netflixSeries;
  } catch (error) {
    console.error("Error saving series to database:", error);
    throw error;
  }
};