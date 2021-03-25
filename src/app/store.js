import { configureStore } from '@reduxjs/toolkit';
import articleReducer from 'features/article/ArticleSlice';
import authReducer from 'features/auth/AuthSlice';

export default configureStore({
  reducer: {
    article: articleReducer,
    auth: authReducer
  },
});

