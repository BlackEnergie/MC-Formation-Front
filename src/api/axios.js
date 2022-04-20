import axios from 'axios';

const BASE_URL = "http://" + window.location.hostname + ":8080";

export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: false
});
