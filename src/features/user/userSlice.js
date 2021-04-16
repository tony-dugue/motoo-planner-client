import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userProfile: {},
    isLoading: false,
    error: ""
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserProfile: (state, action) => {
            state.userProfile = action.payload
            state.isLoading = false
        },
        editUserProfile: (state, action) => {
            return {...state, userProfile: action.payload}
        },
        setUserLogout: state => {
            state.userProfile = {}
        },
        addRoadbook: (state, action) => {
            state.userProfile.roadbooks.push(action.payload)
            state.loading = false
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

const { reducer, actions } = userSlice;

export const { editUserProfile, setUserProfile, setUserLogout,addRoadbook,  getLoading, getFailure, getSuccess } = actions

export default reducer;

export const selectUser = state => state.user;
