import axios from 'axios';
import config from '../config';

const api = axios.create({
  baseURL: 'http://pda.mockable.io/api/',
});

// const api = axios.create({
//   baseURL: config.apiConfig.baseUrl,
// });

export default api;
