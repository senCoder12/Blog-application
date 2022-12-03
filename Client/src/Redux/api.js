import axios from 'axios'

const API = axios.create({baseURL: 'http://localhost:8080'});

export const signIn = (FormData) => API.post("/users/signin",FormData);
export const signUp = (FormData) => API.post("/users/signup",FormData);

export const createTour = (FormData) => API.post("/tour",FormData);