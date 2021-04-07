import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    checklistTodo: []
}

const checklistSlice = createSlice({
    name: 'checklist',
    initialState,
    reducers: {
        saveChecklist: (state, action) => {
            state.checklistTodo.push(action.payload)
        },
        deleteChecklist: (state, action) => {
            return {...state, checklistTodo: state.checklistTodo.filter((item) => action.payload !== item.id)}
        },
        setCheck: (state, action) => {
            state.checklistTodo.map(item => {
                if (action.payload === item.id) {
                    (item.checked === true) ? item.checked = false : item.checked = true
                }
            })
        }
    }
})

export const { saveChecklist, deleteChecklist, setCheck } = checklistSlice.actions

export const selectChecklistTodo = state => state.checklist.checklistTodo

export default checklistSlice.reducer
