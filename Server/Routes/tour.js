import express from "express";
import { getTour, createTour } from "../Controllers/tourHandler.js";
import { auth } from "../Middlewares/auth.js";

const tourRouter = express.Router();

tourRouter.post('/',auth, createTour);
tourRouter.get('/',auth, getTour);

export default tourRouter;