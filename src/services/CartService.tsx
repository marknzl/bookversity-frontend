import axios from 'axios';
import AuthService from './AuthService';
import { API_URL } from '../utils/Constants';

const CART_API_URL = API_URL + "Cart/";

function addToCart(itemId: number) {
    return axios.post(CART_API_URL + `Add?itemId=${itemId}`, {}, {
        headers: AuthService.getAuthHeader()
    });
}

const fetchCartItems = async() => {
    return await fetch(CART_API_URL + "MyCart", {
        headers: {
            'Authorization': `${AuthService.getAuthHeader().Authorization}`
        },
    });
}

const removeFromCart = async(itemId: string) => {
    await fetch(`${CART_API_URL}Remove?itemId=${itemId}`, {
        method: 'POST',
        headers: {
            'Authorization': `${AuthService.getAuthHeader().Authorization}`
        },
    });
}

export default {
    addToCart,
    fetchCartItems,
    removeFromCart
};