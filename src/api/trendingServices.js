import axios from 'axios';
import { API_URL } from '../constant';


export function getAllTrending() {
    return axios.get(`${API_URL}/trending`);
}

export function getTrending(id) {
    return axios.get(`${API_URL}/trending/${id}`);
}

export function createTrending(newData) {
    return axios.post(`${API_URL}/trending`, newData);
}

export function updateTrending(id, newData) {
    return axios.patch(`${API_URL}/trending/${id}`, newData);
}

export function deleteTrending(id) {
    return axios.delete(`${API_URL}/trending/${id}`);
}
