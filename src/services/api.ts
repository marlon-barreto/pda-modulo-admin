import axios from 'axios';
import config from '../config';

// http://179.184.159.52:9015/api/

const api = axios.create({
  baseURL: 'http://pda.mockable.io/api/',
});

// const api = axios.create({
//   baseURL: config.apiConfig.baseUrl,
// });

export default api;
