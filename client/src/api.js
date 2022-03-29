import axios from "axios";

const domain = 'https://movie-star-server.herokuapp.com';

export const publishMovie = (payload) => axios.post(`${domain}/movies/publish`, payload);

export const getAllMovies = () => `${domain}/movies/all`;

export const searchMovie = (search) => axios.get(`${domain}/movies/findAll?keyword=${search}`);

export const getAmovie = (id) => `${domain}/movies/${id}`;