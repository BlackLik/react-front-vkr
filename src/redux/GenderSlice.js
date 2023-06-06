import { createSlice } from '@reduxjs/toolkit';

var data = JSON.parse(localStorage.getItem('gender'));

if (!data) {
  data = {
    id: null,
    name: null,
  };
}

const GenderSlice = createSlice({
  name: 'gender',
  initialState: {
    data: {
      id: data.id,
      name_gender: data.name_gender,
    },
  },
  reducers: {
    setGender: (state, action) => {
      localStorage.setItem('gender', JSON.stringify(action.payload));
      state.data = { ...action.payload };
    },
  },
});

export const { setGender } = GenderSlice.actions;

export default GenderSlice.reducer;
