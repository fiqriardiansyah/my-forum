import { LoginResponse, RegisterResponse, User } from "models";
import endPoints from "service/end-points";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import { message } from "antd";

const ActionType = {
    DO_REGISTER: "DO_REGISTER",
    DO_LOGIN: "DO_LOGIN",
    GET_USERS: "GET_USERS",
    GET_PROFILE: "GET_PROFILE",
};

const doRegister = (data: RegisterResponse) => ({
    type: ActionType.DO_REGISTER,
    payload: {
        data,
    },
});

const doLogin = (data: LoginResponse) => ({
    type: ActionType.DO_LOGIN,
    payload: {
        data,
    },
});

const getUsers = (users: User[]) => ({
    type: ActionType.GET_USERS,
    payload: {
        users,
    },
});

const getProfile = (user: User) => ({
    type: ActionType.GET_PROFILE,
    payload: {
        user,
    },
});

const asyncDoRegister = (data: any) => async (dispatch: any) => {
    dispatch(showLoading());
    endPoints
        .Register(data)
        .then((res) => {
            message.success(res.data.message);
            dispatch(doRegister(res.data.data));
        })
        .finally(dispatch(hideLoading()));
};

const asyncDoLogin = (data: any) => async (dispatch: any) => {
    dispatch(showLoading());
    endPoints
        .Login(data)
        .then((res) => {
            dispatch(doLogin(res.data.data));
        })
        .finally(dispatch(hideLoading()));
};

const asyncGetUsers = () => async (dispatch: any) => {
    dispatch(showLoading());
    endPoints
        .Users()
        .then((res) => {
            dispatch(getUsers(res.data.data?.users || []));
        })
        .finally(dispatch(hideLoading()));
};

const asyncGetProfile = () => async (dispatch: any) => {
    dispatch(showLoading());
    endPoints
        .Me()
        .then((res) => {
            dispatch(getProfile(res.data.data?.user));
        })
        .finally(dispatch(hideLoading()));
};

export { ActionType, asyncDoLogin, asyncDoRegister, asyncGetProfile, asyncGetUsers };
