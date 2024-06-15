import axios from 'axios';

export const axiosClient = axios.create({
    baseURL: 'https://e-commerce-1-6kw7.onrender.com/api',
    // baseURL: 'http://localhost:4500/api',
    withCredentials: true,
    });