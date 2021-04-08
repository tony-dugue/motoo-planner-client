import { configureStore } from '@reduxjs/toolkit';
import articleReducer from 'features/article/articleSlice';
import userReducer from 'features/user/userSlice';
import roadbookReducer from 'features/roadbook/roadbookSlice';
import checklistReducer from 'features/checklist/checklistSlice';
import authReducer from 'features/auth/authSlice';

export default configureStore({
  reducer: {
    article: articleReducer,
    user: userReducer,
    roadbook: roadbookReducer,
    checklist: checklistReducer,
    auth: authReducer
  }
});

