import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import bandReducer from './slices/bandSlice';
import rehearsalReducer from './slices/rehearsalSlice';
import availabilityReducer from './slices/availabilitySlice';
import notificationReducer from './slices/notificationSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    bands: bandReducer,
    rehearsals: rehearsalReducer,
    availability: availabilityReducer,
    notifications: notificationReducer,
  },
});

export default store;
