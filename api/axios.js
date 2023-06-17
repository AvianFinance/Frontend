import axios from 'axios';

const instance = axios.create({
    baseURL: "http://54.161.219.171:8080/api"
});

export default instance;  