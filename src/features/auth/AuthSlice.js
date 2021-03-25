import { createSlice } from '@reduxjs/toolkit';

// State global
const initialState = {
    token: '',
    loading: false,
    error: false
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    // modifie le state lors d'une action
    reducers: {
        getTokenSuccess: (state, action) => {
            state.token = action.payload
        },
        getLoading: state => {
            state.loading = true
        },
        getFailure: state => {
            state.loading = false
            state.errors = true
        }
    },
});

// export des actions au composant
export const { getTokenSuccess, getLoading, getFailure } = authSlice.actions;

// export du REDUCER
export default authSlice.reducer;

// fonction thunk (une fonction 'thunk' permet de faire une logique asynchrone).
export function setToken(email, password) {
    return async dispatch => {
        //fetch(process.env.REACT_APP_API_URL + params)
        fetch('http://127.0.0.1:8000/api/login_check', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "username": email,
                "password": password
            })
        })
            .then(response => response.json())
            .then(data => dispatch(getTokenSuccess(data)))
            .then(data => sessionStorage.setItem('token', JSON.stringify(data.payload.token)))
            .catch(error => console.log(error))
    }
}

// SELECTOR (exporte le state pour être récupéré dans un composant avec le Hook useSelector() )
export const selectToken = state => state.auth

