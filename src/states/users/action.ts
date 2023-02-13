import { LoginResponse, RegisterResponse, User } from "models";
import { hideLoading, showLoading } from "react-redux-loading-bar";
import Utils from "utils";

export const ActionType = {
    DO_REGISTER: "DO_REGISTER",
    DO_LOGIN: "DO_LOGIN",
    DO_LOGOUT: "DO_LOGOUT",
    GET_USERS: "GET_USERS",
    SET_USERS: "SET_USERS",
    GET_PROFILE: "GET_PROFILE",
};

export const GET_USERS_LOADING = "GET_USERS_LOADING";

export const doRegister = (data: RegisterResponse) => ({
    type: ActionType.DO_REGISTER,
    payload: {
        ...data,
    },
});

export const doLogin = (data: LoginResponse) => ({
    type: ActionType.DO_LOGIN,
    payload: {
        ...data,
    },
});

export const setUsers = (users: User[]) => ({
    type: ActionType.SET_USERS,
    payload: {
        users,
    },
});

export const getUsers = () => ({
    type: ActionType.GET_USERS,
});

export const setProfile = (user: User) => ({
    type: ActionType.SET_USERS,
    payload: {
        ...user,
    },
});

export const doLogout = () => ({
    type: ActionType.DO_LOGOUT,
});

export const asyncGetUsers = (caller: () => Promise<User[]>) => async (dispatch: any) => {
    dispatch(showLoading(GET_USERS_LOADING));
    dispatch(getUsers());
    try {
        dispatch(setUsers(await caller()));
    } catch (e) {}
    dispatch(hideLoading(GET_USERS_LOADING));
};

export const asyncGetProfile = (caller: () => Promise<User>) => async (dispatch: any) => {
    dispatch(showLoading());
    try {
        dispatch(setProfile(await caller()));
    } catch (e) {
        Utils.Logout();
        window.location.reload();
    }
    dispatch(hideLoading());
};

export const asyncDoRegister = (caller: () => Promise<RegisterResponse>) => async (dispatch: any) => {
    dispatch(showLoading());
    try {
        dispatch(doRegister(await caller()));
    } catch (e) {}
    dispatch(hideLoading());
};

export const asyncDoLogin = (loginCaller: () => Promise<LoginResponse>, profileCaller: () => Promise<User>) => async (dispatch: any) => {
    dispatch(showLoading());
    try {
        dispatch(doLogin(await loginCaller()));
        dispatch(setProfile(await profileCaller()));
    } catch (e) {}
    dispatch(hideLoading());
};
