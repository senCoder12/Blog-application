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
export const getTours = createAsyncThunk("tour/get", async(_,{rejectWithValue})=>{
    try {
        const response = await api.getTours();
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

const tourSlice = createSlice({
    name: 'tour',
    initialState: {
        tour: {},
        tours: [],
        userTours: [],
        tagTours: [],
        error: "",
        loading: false
    },
    extraReducers: {
        [createTour.pending] : (state,action)=> {
            state.loading = true;
        },
        [createTour.fulfilled] : (state,action)=> {
            state.loading = false;
            state.tours = action.payload;
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
            state.tours = action.payload;
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
            state.tours = action.payload;
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
        }
    }
})

export default tourSlice.reducer;