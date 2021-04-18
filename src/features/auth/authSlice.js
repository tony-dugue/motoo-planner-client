import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    isAuth: false,
    error: "",
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        authPending: (state) => {
            state.isLoading = true;
        },
        authSuccess: (state) => {
            state.isLoading = false;
            state.isAuth = true;
            state.error = "";
        },
        authFail: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        },
        authFailure: (state) => {
            state.isAuth = false;
        }
    },
});

const { reducer, actions } = authSlice;

export const { authPending, authSuccess, authFail, authFailure } = actions;

export default reducer;

export const selectAuth = state => state.auth;
