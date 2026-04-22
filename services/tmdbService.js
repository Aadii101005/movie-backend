import axios from "axios";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const fetchPopularMovies = async (pages =2) => {

   let allMovies = [];
   
  for (let i = 1; i <= pages; i++) {
  const res = await axios.get(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_KEY}`
  );

  allMovies = [...allMovies, ...res.data.results];
}
  return allMovies;
};

export const saveMoviesToDB = async () => {
  try {
    const movies = await fetchPopularMovies();
    
    for (let movie of movies) {
      await prisma.movie.upsert({
        where: { externalId: String(movie.id) },
        update: {
          title: movie.title || movie.original_title,
          description: movie.overview,
          year: movie.release_date ? new Date(movie.release_date).getFullYear() : new Date().getFullYear(),
          genre: "Movie",
          poster: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null,
          rating: movie.vote_average,
        },
        create: {
          title: movie.title || movie.original_title,
          description: movie.overview,
          year: movie.release_date ? new Date(movie.release_date).getFullYear() : new Date().getFullYear(),
          genre: "Movie",
          poster: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null,
          rating: movie.vote_average,
          externalId: String(movie.id),
        },
      });
    }
    
    console.log(`Successfully saved ${movies.length} movies to database.`);
    return movies;
  } catch (error) {
    console.error("Error saving movies to database:", error);
    throw error;
  }
};

export const fetchPopularSeries = async (pages = 2) => {

  let allSeries = [];

  for(let i=1; i<=pages; i++){
  const res = await axios.get(
    `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.TMDB_KEY}`
  );
   allSeries = [...allSeries, ...res.data.results];
}
  return allSeries;
};

export const saveSeriesToDB = async () => {
  try {
    const series = await fetchPopularSeries();
    
    for (let s of series) {
      await prisma.tvSeries.upsert({
        where: { externalId: String(s.id) },
        update: {
          title: s.name || s.original_name,
          description: s.overview,
          year: s.first_air_date ? new Date(s.first_air_date).getFullYear() : new Date().getFullYear(),
          genre: "TV Series",
          poster: s.poster_path ? `https://image.tmdb.org/t/p/w500${s.poster_path}` : null,
          rating: s.vote_average,
        },
        create: {
          title: s.name || s.original_name,
          description: s.overview,
          year: s.first_air_date ? new Date(s.first_air_date).getFullYear() : new Date().getFullYear(),
          genre: "TV Series",
          poster: s.poster_path ? `https://image.tmdb.org/t/p/w500${s.poster_path}` : null,
          rating: s.vote_average,
          externalId: String(s.id),
        },
      });
    }
    
    console.log(`Successfully saved ${series.length} series to database.`);
    return series;
  } catch (error) {
    console.error("Error saving series to database:", error);
    throw error;
  }
};
