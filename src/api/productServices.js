import axios from 'axios';
import { API_URL } from '../constant';


export function getAllProducts() {
    return axios.get(`${API_URL}/product`);
}

export function getProduct(id) {
    return axios.get(`${API_URL}/product/${id}`);
}

export function createProduct() {
    return axios.post(`${API_URL}/product`);
}

export function updateProduct(id) {
    return axios.patch(`${API_URL}/product/${id}`);
}

export function deleteProduct(id) {
    return axios.delete(`${API_URL}/product/${id}`);
}
