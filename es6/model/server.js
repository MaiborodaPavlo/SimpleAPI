import axios from "axios";

let server = axios.create({
    baseURL: '/js-hw-api/'
});

server.interceptors.request.use((request) => {

    request.headers.Autorization = '9e87bdf7c479f614075de38ca044952d';

    return request;
});

export default server;