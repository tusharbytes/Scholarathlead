import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// const url = "https://scholarathlead.com/api/user/";



export const applicationRegister = createAsyncThunk(
    "applicationRegister",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`http://localhost:3001/api/user/submit-form`, formData);
            console.log(response.data, "response");
                return response.data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response?.data || "Something went wrong");
        }
    }
);



const applicationSlice = createSlice({
    name: "applicationSlice",
    initialState: {
        applicationForm: null,
        loading: false,
        error: null,
    },
    reducers: {
        setApplication: (state, action) => {
            console.log(state, "state")
            console.log(action, "actions")
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(applicationRegister.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(applicationRegister.fulfilled, (state, action) => {

                state.loading = false;
                state.applicationForm = action.payload;
            })
            .addCase(applicationRegister.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to submit form";
            });
    },
});
export const { setApplication } = applicationSlice.actions
export default applicationSlice.reducer;
