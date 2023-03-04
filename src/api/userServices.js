import axios from 'axios';
import { API_URL } from '../constant';

const config = {
  header: { 'content-type': 'multipart/form-data'}
}

export function getUser(userId) {
  return axios.post(`${API_URL}/user`, {userId})
}

export function updateUser(newData) {
  return axios.patch(`${API_URL}/user`, newData, config)
}