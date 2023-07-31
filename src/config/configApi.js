import axios from 'axios';
import { API_URL } from '../constant';
import getToken from '../utils/token';

const configApi = axios.create({
  baseURL: API_URL,
});

// Add a request interceptor
configApi.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default configApi;