import { ActionType } from "./action";

function userReducer(user: any = null, action: any = {}) {
    switch (action.type) {
        case ActionType.DO_LOGIN:
            return action.payload.data;
        case ActionType.DO_REGISTER:
            return action.payload.data;
        default:
            return user;
    }
}
export default userReducer;
