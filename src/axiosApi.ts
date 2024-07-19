import axios from 'axios';

const axiosApi = axios.create({
  baseURL: 'https://api.tvmaze.com/'
});

export default axiosApi;