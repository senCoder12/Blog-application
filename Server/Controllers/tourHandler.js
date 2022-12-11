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
        const {page} = req.query;
        const limit = 6;
        const total = await tourModel.countDocuments({});
        const starIndex = (Number(page)-1 ) * limit;
        const tours = await tourModel.find().limit(limit).skip(starIndex);
        res.json({
            data: tours,
            currentPage: Number(page),
            totalTours: total,
            noOfPages: Math.ceil(total / limit)
        })
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
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({message: "User does not exist"});
    }
    const userTours = await tourModel.find({creator: id});
    res.status(200).json(userTours);
}

export const deleteTour = async(req, res) => {
    try {
        const {id} = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)) {
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
        if(!mongoose.Types.ObjectId.isValid(id)) {
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

export const getTourBySearch = async(req,res) => {
    const {searchQuery} = req.query;
    try {
        const title = new RegExp(searchQuery,"i");
        const tours = await tourModel.find({title})
        return res.status(200).json(tours);
    } catch (error) {
        return res.status(500).json({message: "Something went wrong"});
    }
}

export const getToursByTag = async(req,res) => {
    const {tag} = req.params;
    try {
        const tours = await tourModel.find({tags: {$in: tag}})
        return res.status(200).json(tours);
    } catch (error) {
        return res.status(500).json({message: "Something went wrong"});
    }
}

export const getRelatedTours = async(req,res) => {
    const tags = req.body;
    console.log(tags);
    try {
        const tours = await tourModel.find({tags: {$in: tags}})
        return res.status(200).json(tours);
    } catch (error) {
        return res.status(404).json({message: "Something went wrong"});
    }
}

export const likeTour = async(req, res) => {
    const {id} = req.params;
    try {
        if(!req.userId) return res.status(404).json({message: `User is not autherised`});
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({message: "User does not exist"});
        }
        const tour = await tourModel.findById(id);
        const index = tour.likes.findIndex(id => id=== String(req.userId));

        if(index == -1) {
            tour.likes.push(req.userId);
        } else {
            tour.likes.splice(index, 1);
        }
        
        const updatedTour = await tourModel.findByIdAndUpdate(id, tour, {new: true});

        res.status(200).json(updatedTour);
    } catch (error) {
        return res.status(404).json({message: "Something went wrong"});
    }
}