import {createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { Action } from "@remix-run/router";
import * as api from "../api"

export const login = createAsyncThunk("auth/login", async({formValue,navigate,toast})=>{
    try {
        const response = await api.signIn(formValue);
        toast.success("Login successfully");
        navigate("/");
        return response.data;
    } catch (error) {
        console.log(error);
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        error: "",
        loading: false
    },
    extraReducers: {
        [login.pending] : (state,action)=> {

            
        }
    }
})

export default authSlice.reducer;