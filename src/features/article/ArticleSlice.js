import { createSlice } from '@reduxjs/toolkit';

// State global
const initialState = {
    article: {},
    loading: false,
    error: false
}

export const articleSlice = createSlice({
    name: 'article',
    initialState,
    // modifie le state lors d'une action
    reducers: {

        getArticle: state => {
            state.loading = true
        },
        getArticleSuccess: (state, action) => {
            state.article = action.payload
            state.loading = false
            state.errors = false
        },
        getArticleFailure: state => {
            state.loading = false
            state.errors = true
        }
    },
});

// export des actions au composant
export const { getArticle, getArticleSuccess, getArticleFailure} = articleSlice.actions;

// export du REDUCER
export default articleSlice.reducer;

// Cette fonction s'appelle un 'thunk' et permet de faire une logique asynchrone.
export function fetchArticle(params) {
    return async dispatch => {
        dispatch(getArticle())

        //fetch(process.env.REACT_APP_API_URL + params)
        fetch('http://127.0.0.1:8000/api' + params)
            .then(response => response.json())
            .then(data => dispatch(getArticleSuccess(data)))
            .catch(error => dispatch(getArticleFailure(error)))
    }
}

// SELECTOR (exporte le state pour être récupéré dans un composant avec le Hook useSelector() )
export const selectArticle = state => state.article

