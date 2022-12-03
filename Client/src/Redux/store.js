import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./Features/authSlice";
import tourSlice from "./Features/tourSlice";

export default configureStore({
    reducer: {
        auth: authSlice,
        tour: tourSlice
    }
})