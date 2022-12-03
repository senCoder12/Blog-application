import express from "express";
import { getTour, createTour } from "../Controllers/tourHandler.js";

const tourRouter = express.Router();

tourRouter.post('/', createTour);
tourRouter.get('/signin', getTour);

export default tourRouter;