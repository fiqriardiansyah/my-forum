import { LoginResponse, RegisterResponse, User } from "models";
import endPoints from "service/end-points";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import { message } from "antd";
import Utils from "utils";

const ActionType = {
    DO_REGISTER: "DO_REGISTER",
    DO_LOGIN: "DO_LOGIN",
    DO_LOGOUT: "DO_LOGOUT",
    GET_USERS: "GET_USERS",
    SET_USERS: "SET_USERS",
    GET_PROFILE: "GET_PROFILE",
};

const doRegister = (data: RegisterResponse) => ({
    type: ActionType.DO_REGISTER,
    payload: {
        ...data,
    },
});

const doLogin = (data: LoginResponse) => ({
    type: ActionType.DO_LOGIN,
    payload: {
        ...data,
    },
});

const setUsers = (users: User[]) => ({
    type: ActionType.SET_USERS,
    payload: {
        users,
    },
});

const getUsers = () => ({
    type: ActionType.GET_USERS,
});

const getProfile = (user: User) => ({
    type: ActionType.SET_USERS,
    payload: {
        ...user,
    },
});

const doLogout = () => ({
    type: ActionType.DO_LOGOUT,
});

const asyncGetUsers = () => async (dispatch: any) => {
    dispatch(showLoading());
    dispatch(getUsers());
    try {
        const res = await endPoints.Users();
        dispatch(setUsers(res.data.data?.users || []));
    } catch (e) {}
    dispatch(hideLoading());
};

const asyncGetProfile = () => async (dispatch: any) => {
    dispatch(showLoading());
    try {
        const res = await endPoints.Me();
        dispatch(getProfile(res.data.data?.user));
    } catch (e) {
        Utils.Logout();
        window.location.reload();
    }
    dispatch(hideLoading());
};

const asyncDoRegister = (data: any) => async (dispatch: any) => {
    dispatch(showLoading());
    try {
        const res = await endPoints.Register(data);
        message.success(res.data.message);
        dispatch(doRegister(res.data.data));
    } catch (e) {}
    dispatch(hideLoading());
};

const asyncDoLogin = (data: any) => async (dispatch: any) => {
    dispatch(showLoading());
    try {
        const login = await endPoints.Login(data);
        dispatch(doLogin(login.data.data));
        const profile = await endPoints.Me();
        dispatch(getProfile(profile.data.data?.user));
    } catch (e) {}
    dispatch(hideLoading());
};

export { ActionType, asyncDoLogin, asyncDoRegister, asyncGetProfile, asyncGetUsers, doLogin, doRegister, doLogout };
