import Cookies from "js-cookie";
import { TOKEN } from "./constant";

const Utils = {
    Logout() {
        Cookies.remove(TOKEN);
        window.location.reload();
    },
};

export default Utils;
