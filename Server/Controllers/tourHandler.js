import mongoose from 'mongoose';
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
export const getToursByUser = async(req, res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId(id)) {
        return res.status(404).json({message: "User does not exist"});
    }
    const userTours = await tourModel.find({creator: id});
    res.status(200).json(userTours);
}

export const deleteTour = async(req, res) => {
    try {
        const {id} = req.params;
        if(!mongoose.Types.ObjectId(id)) {
            return res.status(404).json({message: "User does not exist"});
        }
        await tourModel.findByIdAndRemove(id);
        return res.status(200).json({message: "Tour has been deleted"});   
    } catch (error) {
        return res.status(404).json({message: "Something went wrong"});  
    }
}

export const updateTour = async(req, res) => {
    try {
        const {id} = req.params;
        const {title,description,tags,imageFile,creator} = req.body;
        if(!mongoose.Types.ObjectId(id)) {
            return res.status(404).json({message: "User does not exist"});
        }
        const updatedData = {
            title,description,tags,imageFile,creator,_id: id
        }
        await tourModel.findByIdAndUpdate(id,updatedData,{new: true});
        return res.status(200).json(updatedData);   
    } catch (error) {
        return res.status(404).json({message: "Something went wrong"});  
    }
}
