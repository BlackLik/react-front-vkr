import { configureStore } from '@reduxjs/toolkit';
import RegionSlice from './RegionSlice';
import GenderSlice from './GenderSlice';
import ParamsToPredictSlice from './ParamsToPredictSlice';

export default configureStore({
  reducer: {
    region: RegionSlice,
    gender: GenderSlice,
    paramsPredict: ParamsToPredictSlice
  },
  devTools: import.meta.env.VITE_ENV === 'development',
});
