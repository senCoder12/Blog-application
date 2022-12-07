import tourModel from '../Models/tour.model.js';

export const createTour = async(req, res) => {
    const tour = req.body;
    const newTour = tourModel({...tour,creator: req.userId});
    try {
        await newTour.save();
        res.status(201).json(newTour);
    } catch (error) {
        res.status(404).json({message: "Something went wrong"})
    }
}

export const getTours = async(req, res) => {
    try {
        const tours = await tourModel.find();
        res.status(200).json(tours);
    } catch (error) {
        res.status(404).json({message: "Something went wrong"})
    }
}

export const getTour = async(req, res) => {
    try {
        const {id} = req.params;
        const tour = await tourModel.findById(id);
        res.status(200).json(tour);
    } catch (error) {
        res.status(404).json({message: "Something went wrong"})
    }
}