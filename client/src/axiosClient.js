import axios from 'axios';

export const axiosClient = axios.create({
    baseURL: 'https://e-commerce-kbkd.onrender.com/api',
    withCredentials: true,
    });