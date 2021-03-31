import axios from "axios";
import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialState = {
    roadbook: {},
    loading: false,
    error: false
}

export const roadbookSlice = createSlice({
    name: 'roadbook',
    initialState,
    reducers: {
        addRoadbook: (state, action) => {
            state.roadbook = action.payload
        },
        getSingleRoadbook: (state, action) => {
            state.roadbook = action.payload
            state.loading = false
        },
        removeRoadbook: (state) => {
            state.roadbook = {}
            state.loading = false
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
        },
    }
})

export const { addRoadbook, getSingleRoadbook, removeRoadbook, getLoading, getFailure, getSuccess } = roadbookSlice.actions

export default roadbookSlice.reducer

export function roadbookCreate(newRoadbook, token) {
    return async dispatch => {
        dispatch(getLoading())
        const config = { headers: { "Content-Type": "application/json", "Authorization" : `Bearer ${token}` } };
        const body = JSON.stringify(newRoadbook);
        return axios.post('http://127.0.0.1:8000/api/roadbooks', body, config)
            .catch(error => console.log(error))
    }
}

export function findSingleRoadbook(params, token) {
    return async dispatch => {
        dispatch(getLoading())
        const config = { headers: { "Content-Type": "application/json", "Authorization" : `Bearer ${token}` } };
        axios.get('http://127.0.0.1:8000/api' + params, config)
            .then(res => dispatch(getSingleRoadbook(res.data)))
            .catch(error => dispatch(getFailure(error)))
    }
}

export function roadbookDelete(roadbookId, token) {
    return async dispatch => {
        dispatch(getLoading())
        const config = { headers: { "Content-Type": "application/json", "Authorization" : `Bearer ${token}` } };
        await axios.delete(`http://127.0.0.1:8000/api/roadbooks/${roadbookId}`, config)
            .then(res => {
                dispatch(removeRoadbook())
                toast.info('Votre roadbook a bien été supprimé')
            })
            .catch(error => console.log(error))
    }
}

export const selectRoadbook = state => state.roadbook
