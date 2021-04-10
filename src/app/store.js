import { configureStore } from '@reduxjs/toolkit';
import articleReducer from 'features/article/articleSlice';
import userReducer from 'features/user/userSlice';
import roadbookReducer from 'features/roadbook/roadbookSlice';
import authReducer from 'features/auth/authSlice';
import informationReducer from 'features/information/informationSlice';
import itineraryReducer from 'features/itinerary/itinerarySlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    article: articleReducer,
    user: userReducer,
    roadbook: roadbookReducer,
    information: informationReducer,
    itinerary: itineraryReducer
  }
});

