import axios from 'axios';
import { API_URL } from '../constant';


export function getAllTrending() {
    return axios.get(`${API_URL}/trending`);
}

export function getTrending(id) {
    return axios.get(`${API_URL}/trending/${id}`);
}

export function createTrending() {
    return axios.post(`${API_URL}/trending`);
}

export function updateTrending(id) {
    return axios.patch(`${API_URL}/trending/${id}`);
}

export function deleteTrending(id) {
    return axios.delete(`${API_URL}/trending/${id}`);
}
