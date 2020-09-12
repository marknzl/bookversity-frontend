import axios from 'axios';

const API_URL = "https://bookversity-backend.azurewebsites.net/api";
//const API_URL = "https://localhost:5001/api";

function register(email: string, firstName: string, lastName: string, password: string) {
    return axios.post(API_URL + "/User/Register", {
        email,
        firstName,
        lastName,
        password
    })
}

function login(email: string, password: string) {
    return axios.post(API_URL + "/User/Login", {
        email,
        password
    });
}

function logout() {
    localStorage.removeItem("jwt");
    localStorage.removeItem("userId");
}

function isLoggedIn() {
    return localStorage.getItem("jwt") !== null;
}

function getUserId() {
    return localStorage.getItem("userId");
}

function getAuthHeader() {
    const jwt = localStorage.getItem("jwt");
    return { Authorization: 'Bearer ' + jwt };
}

function getImgHeader() {
    const jwt = localStorage.getItem("jwt");
    return { 'content-type': 'multipart/form-data', Authorization: 'Bearer ' + jwt };
}

export default {
    register,
    login,
    logout,
    isLoggedIn,
    getAuthHeader,
    getImgHeader,
    getUserId
};