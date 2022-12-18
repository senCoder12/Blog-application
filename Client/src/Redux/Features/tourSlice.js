import {createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import * as api from "../api"

export const createTour = createAsyncThunk("tour/create", async({updatedTourData,navigate,toast},{rejectWithValue})=>{
    try {
        const response = await api.createTour(updatedTourData);
        toast.success("Created successfully");
        navigate("/");
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})
export const getTours = createAsyncThunk("tour/get", async(page,{rejectWithValue})=>{
    try {
        const response = await api.getTours(page);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

export const getTour = createAsyncThunk("tour/getSingleTour", async(id,{rejectWithValue})=>{
    try {
        const response = await api.getTour(id);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

export const deleteTour = createAsyncThunk("tour/deleteTour", async({id,toast},{rejectWithValue})=>{
    try {
        const response = await api.deleteTour(id);
        toast.success("Tour deleted successfully");
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

export const updateTour = createAsyncThunk("tour/updateTour", async({id,updatedTourData,toast,navigate},{rejectWithValue})=>{
    try {
        const response = await api.updateTour(updatedTourData,id);
        toast.success("Tour updated successfully");
        navigate("/");
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

export const getToursBySearch = createAsyncThunk("tour/getToursBySearch", async(searchQuery,{rejectWithValue})=>{
    try {
        const response = await api.getToursBySearch(searchQuery);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

export const getToursByTag = createAsyncThunk("tour/getToursByTag", async(tag,{rejectWithValue})=>{
    try {
        const response = await api.getToursByTag(tag);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

export const getToursByUser = createAsyncThunk("tour/getToursByUser", async(userId,{rejectWithValue})=>{
    try {
        const response = await api.getToursByUser(userId);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

export const getRelatedTours = createAsyncThunk("tour/getRelatedTours", async(tags,{rejectWithValue})=>{
    try {
        const response = await api.getRelatedTours(tags);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

export const likeTour = createAsyncThunk("tour/likeTour", async({_id},{rejectWithValue})=>{
    try {
        const response = await api.likeTour(_id);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

const tourSlice = createSlice({
    name: 'tour',
    initialState: {
        tour: {},
        tours: [],
        userTours: [],
        tagTours: [],
        relatedTours: [],
        currentPage: 1,
        noOfPages: 1,
        error: "",
        loading: false
    },
    reducers: {
        setCurrentPage: (state,action) =>{
            state.currentPage = action.payload;
        }
    },
    extraReducers: {
        [createTour.pending] : (state,action)=> {
            state.loading = true;
        },
        [createTour.fulfilled] : (state,action)=> {
            state.loading = false;
            // state.tours = action.payload;
        },
        [createTour.rejected] : (state,action)=> {
            state.loading = false;
            state.error = action.payload.error;
        },
        [getTours.pending] : (state,action)=> {
            state.loading = true;
        },
        [getTours.fulfilled] : (state,action)=> {
            state.loading = false;
            state.tours = action.payload.data;
            state.noOfPages = action.payload.noOfPages;
            state.currentPage = action.payload.currentPage;
        },
        [getTours.rejected] : (state,action)=> {
            state.loading = false;
            state.error = action.payload.error;
        },
        [getTour.pending] : (state,action)=> {
            state.loading = true;
        },
        [getTour.fulfilled] : (state,action)=> {
            state.loading = false;
            state.tour = action.payload;
        },
        [getTour.rejected] : (state,action)=> {
            state.loading = false;
            state.error = action.payload.error;
        },
        [getToursByUser.pending] : (state,action)=> {
            state.loading = true;
        },
        [getToursByUser.fulfilled] : (state,action)=> {
            state.loading = false;
            state.userTours = action.payload;
        },
        [getToursByUser.rejected] : (state,action)=> {
            state.loading = false;
            state.error = action.payload.error;
        },
        [updateTour.fulfilled] : (state,action)=> {
            state.loading = false;
            const {arg: {id}} = action.meta;
            if(id) {
                state.userTours = state.userTours.map((item)=> item._id == id ? action.payload : item);
                state.tours = state.tours.filter((item)=> item._id == id ? action.payload : item);
            }
        },
        [updateTour.rejected] : (state,action)=> {
            state.loading = false;
            state.error = action.payload.error;
        },
        [updateTour.pending] : (state,action)=> {
            state.loading = true;
        },
        [deleteTour.pending] : (state,action)=> {
            state.loading = true;
        },
        [deleteTour.fulfilled] : (state,action)=> {
            state.loading = false;
            const {arg: {id}} = action.meta;
            if(id) {
                state.userTours = state.userTours.filter((item)=> item._id !== id);
                state.tours = state.tours.filter((item)=> item._id !== id);
            }
        },
        [deleteTour.rejected] : (state,action)=> {
            state.loading = false;
            state.error = action.payload.error;
        },
        [getToursBySearch.pending] : (state,action)=> {
            state.loading = true;
        },
        [getToursBySearch.fulfilled] : (state,action)=> {
            state.loading = false;
            state.currentPage = 1;
            state.tours = action.payload.data;
            state.noOfPages = action.payload.noOfPages;
        },
        [getToursBySearch.rejected] : (state,action)=> {
            state.loading = false;
            state.error = action.payload.error;
        },
        [getToursByTag.pending] : (state,action)=> {
            state.loading = true;
        },
        [getToursByTag.fulfilled] : (state,action)=> {
            state.loading = false;
            state.tagTours = action.payload;
        },
        [getToursByTag.rejected] : (state,action)=> {
            state.loading = false;
            state.error = action.payload.error;
        },
        
        [getRelatedTours.pending] : (state,action)=> {
            state.loading = true;
        },
        [getRelatedTours.fulfilled] : (state,action)=> {
            state.loading = false;
            state.relatedTours = action.payload;
        },
        [getRelatedTours.rejected] : (state,action)=> {
            state.loading = false;
            state.error = action.payload.error;
        },
        [likeTour.fulfilled] : (state,action)=> {
            state.loading = false;
            const {arg: {_id}} = action.meta;
            if(_id) {
                state.tours = state.tours.map((item)=> item._id == _id ? action.payload : item);
            }
        }, 
        [likeTour.rejected] : (state,action)=> {
            state.error = action.payload.error;
        },
        [likeTour.pending] : (state,action)=> {},
    }
})

export const {setCurrentPage} = tourSlice.actions;
export default tourSlice.reducer;