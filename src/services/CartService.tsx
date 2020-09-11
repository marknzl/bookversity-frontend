import axios from 'axios';
import AuthService from './AuthService';

const API_URL = "https://bookversity-backend.azurewebsites.net/api/";

function addToCart(itemId: number) {
    return axios.post(API_URL + `Cart/Add?itemId=${itemId}`, {}, {
        headers: AuthService.getAuthHeader()
    });
}

function myCart() {
    return axios.get(API_URL + 'Cart/MyCart', {
        headers: AuthService.getAuthHeader()
    });
}

export default {
    addToCart,
    myCart
};