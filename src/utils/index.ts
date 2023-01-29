import Cookies from "js-cookie";
import { TOKEN } from "./constant";

const Utils = {
    Logout() {
        Cookies.remove(TOKEN);
    },
};

export default Utils;
