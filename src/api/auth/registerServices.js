import axios from 'axios';
import { API_URL } from '../../constant';

export function registerUser(username, password, fullName) {
  return axios.post(`${API_URL}/auth/register`, {username, password, fullName});
}