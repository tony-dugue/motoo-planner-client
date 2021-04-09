import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    itineraryTodo: []
}

const itinerarySlice = createSlice({
    name: 'itinerary',
    initialState,
    reducers: {
        addItinerary: (state, action) => {
            state.itineraryTodo.push(action.payload)
        },
        deleteItinerary: (state, action) => {
            return {...state, itineraryTodo: state.itineraryTodo.filter((item) => action.payload !== item.id)}
        },
        getLoading: state => {
            state.isLoading = true
        },
        getSuccess: (state, { payload }) => {
            state.isLoading = false
            state.user = payload
            state.error = ""
        },
        getFailure: (state, { payload }) => {
            state.isLoading = false
            state.error = payload
        }
    }
})

const { reducer, actions } = itinerarySlice;

export const { addItinerary, deleteItinerary, getLoading, getFailure, getSuccess } = actions;

export const selectItineraryTodo = state => state.itinerary.itineraryTodo;

export default reducer;

