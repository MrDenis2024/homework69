import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../axiosApi';
import {ApiShows, IShow, Shows} from '../types';
import {RootState} from '../app/store';

export const fetchShows = createAsyncThunk<Shows[], string, {state: RootState}>('shows/fetchShows', async (name) => {
  const showsResponse = await axiosApi.get<ApiShows[] | null>(`/search/shows?q=${name}`);
  const shows = showsResponse.data;

  if(!shows) {
    return [];
  }

  return shows.map(shows => shows.show);
});

export const fetchOneShow = createAsyncThunk<IShow | null, string, {state: RootState}>('shows/fetchShow', async (id: string) => {
  const showResponse = await axiosApi.get<IShow | null>(`/shows/${id}`);

  if(!showResponse.data) {
    return null;
  }

  return showResponse.data;
});