import axios from "axios";
import Cookies from "js-cookie";
import Utils from "../utils";
import { TOKEN } from "../utils/constant";

const client = axios.create();

client.defaults.baseURL = import.meta.env.VITE_BASE_URL;

client.defaults.timeout = 1000000;

client.defaults.withCredentials = false;

client.defaults.validateStatus = (status) => true;

client.interceptors.request.use(
    (req) => {
        if (Cookies.get(TOKEN)) {
            req.headers.Authorization = `Bearer ${Cookies.get(TOKEN)}`;
        }
        return req;
    },
    (error) => error
);

client.interceptors.response.use(
    (res) => {
        const { status, data } = res;
        // if (status === 401 || data?.status === 401) {
        //     Utils.Logout();
        //     window.location.reload();
        // }
        return res;
    },
    (error) =>
        // if (error.response?.status === 401) {
        //     Utils.Logout();
        //     window.location.reload();
        // }
        error
);

export default client;
