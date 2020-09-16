import AuthService from "./AuthService";

const API_URL = "https://bookversity-backend.azurewebsites.net/api/";

const viewOrder = async (orderId: number) => {
    return await fetch(API_URL + "Orders/ViewOrder?orderId=" + orderId, {
        headers: {
            'Authorization': AuthService.getAuthHeader().Authorization
        }
    });
};

export default {
    viewOrder
}