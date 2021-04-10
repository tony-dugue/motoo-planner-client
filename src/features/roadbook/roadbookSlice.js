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
        addChecklist: (state, action) => {
            state.roadbook.checklists.push(action.payload)
            state.loading = false
        },
        deleteChecklist: (state, action) => {
            return {...state, roadbook: {...state.roadbook, checklists: state.roadbook.checklists.filter(item => action.payload !== item.id)}}
        },
        setCheck: (state, action) => {
            state.roadbook.checklists.forEach(item => {
                if (action.payload === item.id) {
                    (item.checked === true) ? item.checked = false : item.checked = true
                }
            })
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
    }
})

const { reducer, actions } = roadbookSlice;

export const { getSingleRoadbook, removeRoadbook, addChecklist, deleteChecklist, setCheck, getLoading, getFailure, getSuccess } = actions

export const selectRoadbook = state => state.roadbook;
export const selectChecklist = state => state.roadbook.roadbook.checklists;

export default reducer

