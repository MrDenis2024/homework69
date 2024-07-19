import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../app/store';
import {fetchOneShow, fetchShows} from './showThunk';
import {IShow, Shows} from '../types';
import {toast} from 'react-toastify';

export interface ShowState  {
  showName: string;
  shows: Shows[];
  oneShow: IShow | null;
  showsLoading: boolean;
  showLoading: boolean;
}

const initialState: ShowState = {
  showName: '',
  shows: [],
  oneShow: null,
  showsLoading: false,
  showLoading: false,
};

const showsSlice = createSlice({
  name: 'shows',
  initialState,
  reducers: {
    changeName: (state, {payload: name}: PayloadAction<string>) => {
      state.showName = name;
    },
    cleanShows: (state) => {
      state.shows = [];
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchShows.pending, (state) => {
      state.showsLoading = true;
    });
    builder.addCase(fetchShows.fulfilled, (state, {payload: shows}) => {
      state.showsLoading = false;
      state.shows = shows;
    });
    builder.addCase(fetchShows.rejected, (state) => {
      state.showsLoading = false;
      toast.error('Извините произошла ошибка получения данных с сервера');
    });
    builder.addCase(fetchOneShow.pending, (state) => {
      state.showLoading = true;
    });
    builder.addCase(fetchOneShow.fulfilled, (state, {payload: show}) => {
      state.showLoading = false;
      state.oneShow = show;
      if(show) {
        state.showName = show.name;
      }
    });
    builder.addCase(fetchOneShow.rejected, (state) => {
      state.showLoading = false;
      toast.error('Извините произошла ошибка получения данных с сервера');
    });
  }
});

export const showsReducer = showsSlice.reducer;
export const {changeName, cleanShows} = showsSlice.actions;
export const selectorShowName = (state: RootState) => state.shows.showName;
export const selectorShows = (state: RootState) => state.shows.shows;
export const selectorShowsLoading = (state: RootState) => state.shows.showsLoading;
export const selectorShow = (state: RootState) => state.shows.oneShow;
export const selectorShowLoading = (state: RootState) => state.shows.showLoading;
