import axios from "axios";

const api = axios.create({
    baseURL: 'http://187.87.223.235:8000/api'
});

export default api;
