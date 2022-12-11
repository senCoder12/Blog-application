import express from "express";
import { getTour, createTour, getTours, getToursByUser, updateTour, deleteTour, getTourBySearch, getToursByTag, getRelatedTours, likeTour } from "../Controllers/tourHandler.js";
import { auth } from "../Middlewares/auth.js";

const tourRouter = express.Router();

tourRouter.post('/',auth, createTour);
tourRouter.get('/', getTours);
tourRouter.get('/search',getTourBySearch);
tourRouter.post('/realedTours',getRelatedTours);
tourRouter.get('/tag/:tag',getToursByTag);
tourRouter.get('/:id', getTour);
tourRouter.delete('/:id', deleteTour);
tourRouter.patch('/:id', updateTour);
tourRouter.get('/userTours/:id', getToursByUser);
tourRouter.patch('/like/:id',auth, likeTour);

export default tourRouter;