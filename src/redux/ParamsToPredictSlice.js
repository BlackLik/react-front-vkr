import { createSlice } from '@reduxjs/toolkit';

var data = JSON.parse(localStorage.getItem('paramsPredict'));

if (!data) {
  data = {
    ip: null,
    region: null,
    gender: null,
    qualification: null,
    educational_organization: null,
    form_of_education: null,
    profession_code: null,
    duration_of_education: null,
    year_of_enrollment: null,
    citizenship: null,
    year_of_birth: null,
    disability: null,
    pension_for_childs_behalf: null,
    pension_for_childs: null,
  };
}

const ParamsToPredictSlice = createSlice({
  name: 'params',
  initialState: {
    data: {
      ip: data.ip,
      region: data.region,
      gender: data.gender,
      qualification: data.qualification,
      educational_organization: data.educational_organization,
      form_of_education: data.form_of_education,
      profession_code: data.profession_code,
      duration_of_education: data.duration_of_education,
      year_of_enrollment: data.year_of_enrollment,
      citizenship: data.citizenship,
      year_of_birth: data.year_of_birth,
      disability: data.disability,
      pension_for_childs_behalf: data.pension_for_childs_behalf,
      pension_for_childs: data.pension_for_childs,
    },
  },
  reducers: {
    setParamsToPredict: (state, action) => {
      state.data = { ...state.data, ...action.payload };
      localStorage.setItem(
        'paramsPredict',
        JSON.stringify({ ...state.data, ...action.payload }),
      );
    },
  },
});

export const { setParamsToPredict } = ParamsToPredictSlice.actions;

export default ParamsToPredictSlice.reducer;
