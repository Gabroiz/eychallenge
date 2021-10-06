import axios from 'axios';

export const API = axios.create({
    baseURL: 'https://performance-tracker-fiap.herokuapp.com'
})