import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    checklistTodo: []
}

const checklistSlice = createSlice({
    name: 'checklist',
    initialState,
    reducers: {
        addChecklist: (state, action) => {
            state.checklistTodo.push(action.payload)
        },
        deleteChecklist: (state, action) => {
            return {...state, checklistTodo: state.checklistTodo.filter((item) => action.payload !== item.id)}
        },
        setCheck: (state, action) => {
            state.checklistTodo.forEach(item => {
                if (action.payload === item.id) {
                    (item.checked === true) ? item.checked = false : item.checked = true
                }
            })
        }
    }
})

const { reducer, actions } = checklistSlice;

export const { addChecklist, deleteChecklist, setCheck } = actions;

export const selectChecklistTodo = state => state.checklist.checklistTodo;

export default reducer;

