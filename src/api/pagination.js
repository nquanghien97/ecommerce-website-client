import axios from 'axios';
import { API_URL } from '../constant';

export function paginationServices(page) {
  return axios.post(`http://localhost:5000/api/page?page=${page}`);
}