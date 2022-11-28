import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./Features/authSlice";

export default configureStore({
    reducer: {
        auth: authSlice
    }
})