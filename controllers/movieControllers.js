import { fetchNetflixMovies } from "../services/tmdb.service.js";

export const getNetflixMovies = async (req, res) => {
  const data = await fetchNetflixMovies();
  res.json(data);
};