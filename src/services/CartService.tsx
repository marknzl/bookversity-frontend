import axios from 'axios';
import AuthService from './AuthService';

const API_URL = "https://bookversity-backend.azurewebsites.net/api/";
//const API_URL = "https://localhost:5001/api/";

function addToCart(itemId: number) {
    return axios.post(API_URL + `Cart/Add?itemId=${itemId}`, {}, {
        headers: AuthService.getAuthHeader()
    });
}

// function myCart() {
//     return axios.get(API_URL + 'Cart/MyCart', {
//         headers: AuthService.getAuthHeader()
//     });
// }

const fetchCartItems = async() => {
    return await fetch("https://bookversity-backend.azurewebsites.net/api/Cart/MyCart", {
        headers: {
            'Authorization': `${AuthService.getAuthHeader().Authorization}`
        },
    });
}

const removeFromCart = async(itemId: string) => {
    await fetch(`https://bookversity-backend.azurewebsites.net/api/Cart/Remove?itemId=${itemId}`, {
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