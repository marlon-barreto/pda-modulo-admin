import axios from 'axios';
import config from '../config';

const api = axios.create({
  baseURL: 'http://179.184.159.52:9015/api/',
});

// const api = axios.create({
//   baseURL: config.apiConfig.baseUrl,
// });

export default api;
