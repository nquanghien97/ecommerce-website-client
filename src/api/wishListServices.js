import { API_URL } from '../constant';
import configApi from '../config/configApi';

export function addWishListServices(productId) {
    return configApi.post(`${API_URL}/wishlist`, {productId});
}

export function getWishListServices() {
    return configApi.post(`${API_URL}/getwishlist`);
}