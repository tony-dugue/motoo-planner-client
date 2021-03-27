import { configureStore } from '@reduxjs/toolkit';
import articleReducer from 'features/article/articleSlice';
import userReducer from 'features/user/userSlice';

export default configureStore({
  reducer: {
    article: articleReducer,
    user: userReducer
  }
});

