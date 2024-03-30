import axios from "axios";
import { API_KEY } from "../src/constants/index";

/// Endpoint
const apiBaseUrl = "https://api.themoviedb.org/3";
const trendingMoviesEndpoint = `${apiBaseUrl}/movie/
now_playing?api_key=${API_KEY}`;
const upcomingMoviesEndpoint = `${apiBaseUrl}/movie/upcoming?api_key=${API_KEY}`;
const topRatedMoviesEndpoint = `${apiBaseUrl}/movie/top_rated?api_key=${API_KEY}`;

// dynamic endpoints
const movieDetailsEndpoint = (id) =>
  `${apiBaseUrl}/movie/${id}?api_key=${API_KEY}`;
const movieCreditsEndpoint = (id) =>
  `${apiBaseUrl}/movie/${id}/credits?api_key=${API_KEY}`;
const movieSimilarMoviesEndpoint = (id) =>
  `${apiBaseUrl}/movie/${id}/similar?api_key=${API_KEY}`;
const movieImagesEndpoint = (id) =>
  `${apiBaseUrl}/movie/${id}/images?api_key=${API_KEY}`;

const personDetailsEndpoint = (id) =>
  `${apiBaseUrl}/person/${id}?api_key=${API_KEY}`;
const personMoviesEndpoint = (id) =>
  `${apiBaseUrl}/person/${id}/movie_credits?api_key=${API_KEY}`;
const searchMoviesEndpoint = (id) =>
  `${apiBaseUrl}/search/movie?api_key=${API_KEY}`;

export const image500 = (path) =>
  path ? `https://image.tmdb.org/t/p/w500${path}` : null;
export const image342 = (path) =>
  path ? `https://image.tmdb.org/t/p/w342${path}` : null;
export const image185 = (path) =>
  path
    ? `https://image.tmdb.org/t/p/w185/${path}`
    : "https://via.placeholder.com/185";

const apiCall = async (endpoint, params) => {
  const options = {
    method: "GET",
    url: endpoint,
    params: params ? params : {},
  };
  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const fetchTrendingMovies = async () => {
  return await apiCall(trendingMoviesEndpoint);
};
export const fetchUpcomingMovies = async () => {
  return await apiCall(upcomingMoviesEndpoint);
};
export const fetchTopRatedMovies = async () => {
  return await apiCall(topRatedMoviesEndpoint);
};

export const fetchMovieDetails = async (id) => {
  return await apiCall(movieDetailsEndpoint(id));
};
export const fetchMovieCredits = async (id) => {
  return await apiCall(movieCreditsEndpoint(id));
};
export const fetchSimilarMovies = async (id) => {
  return await apiCall(movieSimilarMoviesEndpoint(id));
};
export const fetchMovieImages = async (id) => {
  return await apiCall(movieImagesEndpoint(id));
};
export const fetchPersonDetails = async (id) => {
  return await apiCall(personDetailsEndpoint(id));
};
export const fetchPersonMovies = async (id) => {
  return await apiCall(personMoviesEndpoint(id));
};
export const fetchSearchMovies = async (id) => {
  return await apiCall(searchMoviesEndpoint(id));
};

/* const options = {
  method: "GET",
  url: "https://api.themoviedb.org/3/trending/movie/day",
  params: { language: "en-US" },
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NmE4MTcwOWVkMWUwYWE1MmFkYzQ1MTc5ZDJmODYzZCIsInN1YiI6IjY1MjMyNzZlYzUwYWQyMDBlYWMzMjhhYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FlmLFqDrV38nNGO66_zwoJyKDGOUCnpxZNy0BbN3zUA",
  },
};

axios
  .request(options)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });
 */
