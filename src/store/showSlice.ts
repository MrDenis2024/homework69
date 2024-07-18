import {createSlice} from '@reduxjs/toolkit';

export interface ShowState  {
  fetchLoading: boolean;
}

const initialState: ShowState = {
  fetchLoading: false,
};

const showSlice = createSlice({
  name: 'show',
  initialState,
  reducers: {},
});

export const showReducer = showSlice.reducer;
