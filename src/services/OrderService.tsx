import AuthService from "./AuthService";
import { API_URL } from "../utils/Constants";

const ORDER_API_URL = API_URL + "Orders/"

const viewOrder = async (orderId: number) => {
    return await fetch(ORDER_API_URL + "ViewOrder?orderId=" + orderId, {
        headers: {
            'Authorization': AuthService.getAuthHeader().Authorization
        }
    });
};

export default {
    viewOrder
}