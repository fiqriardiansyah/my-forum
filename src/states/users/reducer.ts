import Cookies from "js-cookie";
import { LoginResponse, User } from "models";
import Utils from "utils";
import { TOKEN } from "utils/constant";
import { ActionType } from "./action";

export interface SelectorUser extends User, LoginResponse {
    users?: User[];
}

function userReducer(state: SelectorUser | null = null, action: any = {}) {
    switch (action.type) {
        case ActionType.DO_LOGIN:
            Cookies.set(TOKEN, action.payload.token);
            return {
                ...state,
                ...action.payload,
            };
        case ActionType.DO_REGISTER:
            return {
                ...state,
                ...action.payload,
            };
        case ActionType.GET_PROFILE:
            return {
                ...state,
                ...action.payload,
            };
        case ActionType.DO_LOGOUT:
            Utils.Logout();
            return {};
        case ActionType.SET_USERS:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}
export default userReducer;
