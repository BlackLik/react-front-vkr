import { createSlice } from '@reduxjs/toolkit';

var data = JSON.parse(localStorage.getItem('region'));

if (!data) {
  data = {
    id: null,
    iso: null,
    name: null,
  };
}

const RegionSlice = createSlice({
  name: 'region',
  initialState: {
    data: {
      id: data.id,
      iso: data.iso,
      name: data.name,
    },
  },
  reducers: {
    setRegion: (state, action) => {
      localStorage.setItem('region', JSON.stringify(action.payload));
      state.data = { ...action.payload };
    },
  },
});

export const { setRegion } = RegionSlice.actions;

export default RegionSlice.reducer;
