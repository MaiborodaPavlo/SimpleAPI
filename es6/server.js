import axios from 'axios';
//import token from './authorization';
import 'babel-polyfill';

let server = axios.create({
    baseURL: '/js-6-api/'
});

server.interceptors.request.use((request) => {

    let token = window.localStorage.getItem('token');

    if(token !== null) {
        request.headers.Authorization = token;
    }

    return request;
});

export default server;