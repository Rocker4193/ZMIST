import axios from "axios";
import cookies from "./cookies";

const api = axios.create({
    baseURL: 'http://127.0.0.1:5000/api/',
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use((config) => {
    const user = cookies.get('user');
    config.headers.Authorization = user?.token || "";

    return config;
});

export default api;
