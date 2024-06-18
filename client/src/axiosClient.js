import axios from 'axios';

export const axiosClient = axios.create({
    baseURL: 'https://a.radwantravel.com/api',
    withCredentials: true,
    });
