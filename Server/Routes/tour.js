import express from "express";
import { getTour, createTour, getTours, getToursByUser, updateTour, deleteTour } from "../Controllers/tourHandler.js";
import { auth } from "../Middlewares/auth.js";

const tourRouter = express.Router();

tourRouter.post('/',auth, createTour);
tourRouter.get('/', getTours);
tourRouter.get('/:id', getTour);
tourRouter.delete('/:id', deleteTour);
tourRouter.patch('/:id', updateTour);
tourRouter.get('/userTours/:id', getToursByUser);

export default tourRouter;