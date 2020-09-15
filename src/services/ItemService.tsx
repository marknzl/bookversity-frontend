import AuthService from "./AuthService";

const API_URL = "https://bookversity-backend.azurewebsites.net/api/";

const latest10 = async() => {
    return await fetch(API_URL + "Item/Latest10");
}

const fetchItem = async(itemId: string) => {
    return await fetch(API_URL + "/Item/GetItem?id=" + itemId);
}

const searchItems = async(searchTerm: string | null) => {
    return await fetch(API_URL + "/Item/Search?" + searchItems);
}

const deleteItem = async(itemId: string) => {
    await fetch(`https://bookversity-backend.azurewebsites.net/api/Item/DeleteItem?itemId=${itemId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `${AuthService.getAuthHeader().Authorization}`
        },
    });
}

const myItems = async() => {
    return await fetch("https://bookversity-backend.azurewebsites.net/api/Item/MyItems", {
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
