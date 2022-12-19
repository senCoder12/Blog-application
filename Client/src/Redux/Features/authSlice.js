import {createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import * as api from "../api"

export const login = createAsyncThunk("auth/login", async({formValue,navigate,toast},{rejectWithValue})=>{
    try {
        const response = await api.signIn(formValue);
        toast.success("Login successfully");
        navigate("/");
        return response.data;
    } catch (error) {
        toast.error("Credentials error");
        return rejectWithValue(error.response.data);
    }
})
export const register = createAsyncThunk("auth/register", async({formValue,navigate,toast},{rejectWithValue})=>{
    try {
        const response = await api.signUp(formValue);
        toast.success("Signup successfully");
        navigate("/");
        return response.data;
    } catch (error) {
        toast.error("User already registered"); 
        return rejectWithValue(error.response.data);
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        error: "",
        loading: false
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setLogout: (state, action) => {
            state.user = null;
        },
    },
    extraReducers: {
        [login.pending] : (state,action)=> {
            state.loading = true;
        },
        [login.fulfilled] : (state,action)=> {
            state.loading = false;
            localStorage.setItem("profile", JSON.stringify({...action.payload}));
            state.user = action.payload;
        },
        [login.rejected] : (state,action)=> {
            state.loading = false;
            state.error = action.payload.error;
        },
        [register.pending] : (state,action)=> {
            state.loading = true;
        },
        [register.fulfilled] : (state,action)=> {
            state.loading = false;
            localStorage.setItem("profile", JSON.stringify({...action.payload}));
            state.user = action.payload;
        },
        [register.rejected] : (state,action)=> {
            state.loading = false;
            state.error = action.payload.error;
        }
    }
})
export const {setLogout,setUser} = authSlice.actions; 

export default authSlice.reducer;