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
        setUserLogout: state => {
            state.userProfile = {}
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

export const { setUserLogin, setUserProfile, setUserLogout, getLoading, getFailure, getSuccess } = actions

export default reducer;

export const selectUser = state => state.user;
