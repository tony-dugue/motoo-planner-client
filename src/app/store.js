import { configureStore } from '@reduxjs/toolkit';
import articleReducer from 'features/article/articleSlice';
import userReducer from 'features/user/userSlice';
import roadbookReducer from 'features/roadbook/roadbookSlice';
import authReducer from 'features/auth/authSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    article: articleReducer,
    user: userReducer,
    roadbook: roadbookReducer
  }
});

