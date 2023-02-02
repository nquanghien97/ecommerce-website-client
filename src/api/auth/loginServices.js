import axios from 'axios';
import { API_URL } from '../../constant';

export function loginUser(username, password) {
  return axios
    .post(`${API_URL}/auth/login`, {username, password})
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
}
