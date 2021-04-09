import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    informationTodo: []
}

const informationSlice = createSlice({
    name: 'information',
    initialState,
    reducers: {
        addInformation: (state, action) => {
            state.informationTodo.push(action.payload)
        },
        deleteInformation: (state, action) => {
            return {...state, informationTodo: state.informationTodo.filter((item) => action.payload !== item.id)}
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

const { reducer, actions } = informationSlice;

export const { addInformation, deleteInformation, getLoading, getFailure, getSuccess } = actions;

export const selectInformationTodo = state => state.information.informationTodo;

export default reducer;

