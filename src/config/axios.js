import axios from "axios";
import Cookies from "js-cookie";
import { TOKEN } from "../utils/constant";

const client = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 1000000,
    withCredentials: false,
    validateStatus: () => true,
});

client.interceptors.request.use(
    (req) => {
        if (Cookies.get(TOKEN)) {
            req.headers.Authorization = `Bearer ${Cookies.get(TOKEN)}`;
        }
        return req;
    },
    (error) => error
);

export default client;
