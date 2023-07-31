import { API_URL } from '../constant';
import configApi from '../config/configApi';

export function addCartServices(productId, price) {
    return configApi.post(`${API_URL}/cart`, {productId, price});
}

export function getCartServices() {
    return configApi.get(`${API_URL}/getcart`);
}

export function updateCartServices(newCart) {
    return configApi.post(`${API_URL}/cart/updatecart`, newCart)
}

export function deleteCartServices(productId) {
    return configApi.post(`${API_URL}/cart/deletecart`, { productId })
}