import axios from 'axios'

const API = axios.create({baseURL: 'http://localhost:8080'});

API.interceptors.request.use((req) => {
    if (localStorage.getItem("profile")) {
      req.headers.Authorization = `Bearer ${
        JSON.parse(localStorage.getItem("profile")).token
      }`;
    }
    return req;
  });

export const signIn = (FormData) => API.post("/users/signin",FormData);
export const signUp = (FormData) => API.post("/users/signup",FormData);

export const createTour = (FormData) => API.post("/tour",FormData);
export const getTours = () => API.get("/tour");