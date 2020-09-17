import AuthService from "./AuthService";
import { API_URL } from '../utils/Constants';

const ITEM_API_URL = API_URL + "Item/";

const latest10 = async() => {
    return await fetch(ITEM_API_URL + "Latest10");
}

const fetchItem = async(itemId: string) => {
    return await fetch(ITEM_API_URL + "GetItem?id=" + itemId);
}

const searchItems = async(searchTerm: string | null) => {
    return await fetch(ITEM_API_URL + "Search?itemName=" + searchTerm);
}

const deleteItem = async(itemId: string) => {
    await fetch(`${ITEM_API_URL}DeleteItem?itemId=${itemId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `${AuthService.getAuthHeader().Authorization}`
        },
    });
}

const myItems = async() => {
    return await fetch(`${ITEM_API_URL}MyItems`, {
        headers: {
            'Authorization': `${AuthService.getAuthHeader().Authorization}`
        }
    })
}

export default {
    latest10,
    fetchItem,
    searchItems,
    deleteItem,
    myItems
}
