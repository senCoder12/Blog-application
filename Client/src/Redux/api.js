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
export const getTour = (id) => API.get(`/tour/${id}`);
export const deleteTour = (id) => API.delete(`/tour/${id}`);
export const updateTour = (updatedData,id)  => API.patch(`/tour/${id}`,updatedData);
export const getToursByUser = (userId) => API.get(`/tour/userTours/${userId}`);