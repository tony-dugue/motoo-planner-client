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

const { reducer, actions } = articleSlice;

export const { getLoading, getSingleArticle, getAllArticles, getFailure} = actions;

export default reducer;

// SELECTOR (exporte le state pour être récupéré dans un composant avec le Hook useSelector() )
export const selectArticle = state => state.article

