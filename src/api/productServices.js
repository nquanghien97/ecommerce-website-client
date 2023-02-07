import axios from 'axios';
import { API_URL } from '../constant';


export function getAllProducts() {
    return axios.get(`${API_URL}/product`);
}

export function getProduct(id) {
    return axios.get(`${API_URL}/product/${id}`);
}

export function createProduct(newData) {
    return axios.post(`${API_URL}/product`, newData);
}

export function updateProduct(id, newData) {
    return axios.patch(`${API_URL}/product/${id}`, newData);
}

export function deleteProduct(id) {
    return axios.delete(`${API_URL}/product/${id}`);
}
