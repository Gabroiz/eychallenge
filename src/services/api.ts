import axios from 'axios'

export const api = axios.create({

    baseURL: 'https://performance-tracker-fiap.herokuapp.com'


})