import { configureStore } from '@reduxjs/toolkit';
import articleReducer from '../features/article/ArticleSlice'

export default configureStore({
  reducer: {
    article: articleReducer
  },
});

