import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';

// State global
const initialState = {
    articles: [],
    article: {},
    loading: false,
    error: false
}

export const articleSlice = createSlice({
    name: 'article',
    initialState,
    // modifie le state lors d'une action
    reducers: {
        getAllArticles: (state, action) => {
            state.articles = action.payload
            state.loading = false
            state.errors = false
        },
        getSingleArticle: (state, action) => {
            state.article = action.payload
            state.loading = false
            state.errors = false
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
export const { getLoading, getSingleArticle, getAllArticles, getFailure} = articleSlice.actions;

// export du REDUCER
export default articleSlice.reducer;

// fonction thunk (une fonction 'thunk' permet de faire une logique asynchrone).
export function findAllArticles() {
    return async dispatch => {
        dispatch(getLoading())
        //fetch(process.env.REACT_APP_API_URL + params)
        axios.get('http://127.0.0.1:8000/api/articles')
            .then(res => dispatch(getAllArticles(res.data["hydra:member"])))
            .catch(error => dispatch(getFailure(error)))
    }
}

export function findSingleArticle(params) {
    return async dispatch => {
        dispatch(getLoading())
        //fetch(process.env.REACT_APP_API_URL + params)
        axios.get('http://127.0.0.1:8000/api' + params)
            .then(res => dispatch(getSingleArticle(res.data)))
            .catch(error => dispatch(getFailure(error)))
    }
}

// SELECTOR (exporte le state pour être récupéré dans un composant avec le Hook useSelector() )
export const selectArticle = state => state.article
