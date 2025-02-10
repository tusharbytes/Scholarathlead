import { configureStore } from "@reduxjs/toolkit";
import { applicationRegister } from "../redux/application/AplicationSlice";

const store = configureStore({
    reducer: {
        form: applicationRegister
    }
})
export default store