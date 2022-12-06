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

const tourSlice = createSlice({
    name: 'tour',
    initialState: {
        tour: {},
        tours: [],
        userTours: [],
        error: "",
        loading: false
    },
    extraReducers: {
        [createTour.pending] : (state,action)=> {
            state.loading = true;
        },
        [createTour.fulfilled] : (state,action)=> {
            state.loading = false;
            state.tours = [action.payload];
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
        }
    }
})

export default tourSlice.reducer;