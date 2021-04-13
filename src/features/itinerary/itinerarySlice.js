import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    types: [],
    isLoading: false,
    isAuth: false,
    error: "",
};

const itinerarySlice = createSlice({
    name: "itinerary",
    initialState,
    reducers: {
        getTypes: (state, action) => {
            state.types = action.payload
            state.isLoading = false
        },
        getLoading: state => {
            state.loading = true
        },
        getFailure: state => {
            state.loading = false
            state.errors = true
        },
        getSuccess: state => {
            state.loading = false
        }
    },
});

const { reducer, actions } = itinerarySlice;

export const { getTypes, getLoading, getSuccess, getFailure } = actions;

export default reducer;

export const selectTypes = state => state.itinerary.types;
