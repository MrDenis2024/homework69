import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../app/store';
import {fetchShows} from './showThunk';
import {Shows} from '../types';
import {toast} from 'react-toastify';

export interface ShowState  {
  showName: string;
  shows: Shows[];
  fetchLoading: boolean;
}

const initialState: ShowState = {
  showName: '',
  shows: [],
  fetchLoading: false,
};

const showsSlice = createSlice({
  name: 'show',
  initialState,
  reducers: {
    changeName: (state, {payload: name}: PayloadAction<string>) => {
      state.showName = name;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchShows.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchShows.fulfilled, (state, {payload: shows}) => {
      state.fetchLoading = false;
      state.shows = shows;
    });
    builder.addCase(fetchShows.rejected, (state) => {
      state.fetchLoading = false;
      toast.error('Извините произошла ошибка получения данных с сервера');
    });
  }
});

export const showsReducer = showsSlice.reducer;
export const {changeName} = showsSlice.actions;
export const selectorShowName = (state: RootState) => state.show.showName;
export const selectorShows = (state: RootState) => state.show.shows;
export const selectorFetchLoading = (state: RootState) => state.show.fetchLoading;
