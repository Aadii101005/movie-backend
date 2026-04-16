import axios from "axios";

export const fetchNetflixMovies = async () => {
  const res = await axios.get(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.TMDB_KEY}`
  );

  const movies = res.data.results;
  let netflixMovies = [];

  for (let movie of movies) {
    const providerRes = await axios.get(
      `https://api.themoviedb.org/3/movie/${movie.id}/watch/providers?api_key=${process.env.TMDB_KEY}`
    );

    const providers = providerRes.data.results?.IN?.flatrate || [];

    const isNetflix = providers.some(p => p.provider_name === "Netflix");

    if (isNetflix) {
      netflixMovies.push(movie);
    }
  }

  return netflixMovies;
};