import express from "express";
import { getTour, createTour, getTours } from "../Controllers/tourHandler.js";
import { auth } from "../Middlewares/auth.js";

const tourRouter = express.Router();

tourRouter.post('/',auth, createTour);
tourRouter.get('/', getTours);
tourRouter.get('/:id', getTour);

export default tourRouter;