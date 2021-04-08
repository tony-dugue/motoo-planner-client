import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    roadbook: {},
    loading: false,
    error: false
}

export const roadbookSlice = createSlice({
    name: 'roadbook',
    initialState,
    reducers: {
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

const { reducer, actions } = roadbookSlice;

export const { getSingleRoadbook, removeRoadbook, getLoading, getFailure, getSuccess } = actions

export default reducer

/*
export function roadbookCreate(formData, token) {
    return async dispatch => {
        dispatch(getLoading())
        const config = { headers: { 'content-type': 'multipart/form-data', "Authorization" : `Bearer ${token}` } };
        return axios.post(process.env.REACT_APP_API_URL + '/roadbooks', formData, config)
            .catch(error => console.log(error))
    }
}

export function findSingleRoadbook(params, token) {
    return async dispatch => {
        dispatch(getLoading())
        const config = { headers: { "Content-Type": "application/json", "Authorization" : `Bearer ${token}` } };
        axios.get(process.env.REACT_APP_API_URL + params, config)
            .then(res => dispatch(getSingleRoadbook(res.data)))
            .catch(error => dispatch(getFailure(error)))
    }
}

export function roadbookDelete(roadbookId, token) {
    return async dispatch => {
        dispatch(getLoading())
        const config = { headers: { "Content-Type": "application/json", "Authorization" : `Bearer ${token}` } };
        await axios.delete(process.env.REACT_APP_API_URL + `/roadbooks/${roadbookId}`, config)
            .then(res => {
                dispatch(removeRoadbook())
                toast.info('Votre roadbook a bien été supprimé')
            })
            .catch(error => console.log(error))
    }
}

export function roadbookChangeStatus(roadbookStatus, urlPath, token) {
    return async dispatch => {
        dispatch(getLoading())
        const config = { headers: { "Content-Type": "application/json", "Authorization" : `Bearer ${token}` } };
        const body = JSON.stringify(roadbookStatus);
        await axios.put(process.env.REACT_APP_API_URL + urlPath, body, config)
            .then(res => {
                toast.info('Le status du roadbook a bien été modifié')
            })
            .catch(error => console.log(error))
        // ON RECUPERE LES INFORMATIONS DU ROADBOOK
        await axios.get(process.env.REACT_APP_API_URL + urlPath, config)
            .then(res => dispatch(getSingleRoadbook(res.data)))
            .catch(error => console.log(error))
    }
}
*/
export const selectRoadbook = state => state.roadbook
