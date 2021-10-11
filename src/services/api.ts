import axios from 'axios';
import { parseCookies } from 'nookies';

const cookies = parseCookies();

export const api = axios.create({
    baseURL: 'https://performance-tracker-fiap.herokuapp.com',
    headers: {
        Authorization: `Bearer ${cookies['auth.token']}`
    }
})