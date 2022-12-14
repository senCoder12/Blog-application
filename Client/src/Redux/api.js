import axios from 'axios'

const API = axios.create({baseURL: "https://blog-application-api.onrender.com"});

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
export const getTours = (page) => API.get(`/tour?page=${page}`);
export const getTour = (id) => API.get(`/tour/${id}`);
export const deleteTour = (id) => API.delete(`/tour/${id}`);
export const updateTour = (updatedData,id)  => API.patch(`/tour/${id}`,updatedData);
export const getToursByUser = (userId) => API.get(`/tour/userTours/${userId}`);
export const getToursBySearch = (searchQuery) => API.get(`/tour/search?searchQuery=${searchQuery}`);
export const getToursByTag = (tag) => API.get(`/tour/tag/${tag}`);
export const getRelatedTours = (tags) => API.post(`/tour/realedTours`,tags);
export const likeTour = (id) => API.patch(`/tour/like/${id}`);