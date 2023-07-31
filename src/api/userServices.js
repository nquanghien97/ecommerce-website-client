import { API_URL } from '../constant';
import configApi from '../config/configApi';

const config = {
  header: { 'content-type': 'multipart/form-data'}
}

export function getUser() {
  return configApi.post(`${API_URL}/user`)
}

export function updateUser(newData) {
  return configApi.patch(`${API_URL}/user`, newData, config)
}