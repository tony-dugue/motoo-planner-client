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
                    (item.checked) ? item.checked = false : item.checked = true
                }
            })
        },
        addInformation: (state, action) => {
            state.roadbook.informations.push(action.payload)
            state.loading = false
        },
        deleteInformation: (state, action) => {
            return {...state, roadbook: {...state.roadbook, informations: state.roadbook.informations.filter(item => action.payload !== item.id)}}
        },
        addStep: (state, action) => {
            state.roadbook.steps.push(action.payload)
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
        }
    }
})

const { reducer, actions } = roadbookSlice;

export const {
    getSingleRoadbook,
    removeRoadbook,
    addChecklist,
    deleteChecklist,
    setCheck,
    addInformation,
    deleteInformation,
    addStep,
    getLoading,
    getFailure,
    getSuccess
} = actions

export const selectRoadbook = state => state.roadbook;
export const selectChecklist = state => state.roadbook.roadbook.checklists;
export const selectInformations = state => state.roadbook.roadbook.informations;
export const selectSteps = state => state.roadbook.roadbook.steps;

export default reducer

