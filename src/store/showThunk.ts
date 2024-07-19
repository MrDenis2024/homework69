import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../axiosApi';
import {ApiShows, Shows} from '../types';
import {RootState} from '../app/store';

export const fetchShows = createAsyncThunk<Shows[], string, {state: RootState}>('shows/fetchShows', async (name) => {
  const showsResponse = await axiosApi.get<ApiShows[] | null>(`/search/shows?q=${name}`);
  const shows = showsResponse.data;

  if(!shows) {
    return [];
  }

  return shows.map(shows => shows.show);
});