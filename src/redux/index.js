import { configureStore } from '@reduxjs/toolkit';
import RegionSlice from './RegionSlice';

export default configureStore({
  reducer: {
    region: RegionSlice,
  },
  devTools: import.meta.env.VITE_ENV === 'development',
});
