import axios from 'axios';

export const axiosClient = axios.create({
    baseURL: 'https://b.radwantravel.com/api',
    withCredentials: true,
    });
