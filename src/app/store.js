import { configureStore } from '@reduxjs/toolkit';
import articleReducer from 'features/article/articleSlice';
import userReducer from 'features/user/userSlice';
import roadbookReducer from 'features/roadbook/roadbookSlice';

export default configureStore({
  reducer: {
    article: articleReducer,
    user: userReducer,
    roadbook: roadbookReducer
  }
});

