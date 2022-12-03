import tourModel from '../Models/tour.model.js';

export const createTour = async(req, res) => {
    const tour = req.body;
    const newTour = tourModel(tour);
    try {
        await newTour.save();
        res.status(201).json(newTour);
    } catch (error) {
        res.status(404).json({message: "Something went wrong"})
    }
}

export const getTour = async(req, res) => {
    try {
        const tours = await tourModel.find();
        res.status(200).json(tours);
    } catch (error) {
        res.status(404).json({message: "Something went wrong"})
    }
}