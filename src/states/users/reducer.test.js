import axios from "axios";
import { hideLoading, showLoading } from "react-redux-loading-bar";
import { expect, vi } from "vitest";
import {
    asyncDoLogin,
    asyncDoRegister,
    asyncGetProfile,
    asyncGetUsers,
    doLogin,
    doRegister,
    getUsers,
    GET_USERS_LOADING,
    setProfile,
    setUsers,
} from "./action";
import userReducer from "./reducer";

const user = {
    id: "john_doe",
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://generated-image-url.jpg",
};

const token = "just-random-token";

describe("userReducer function", () => {
    let initialState;

    beforeEach(() => {
        initialState = {};
    });

    it("should return the initial state when given by unknown action", () => {
        const action = { type: "UNKNOWN" };

        const nextState = userReducer(initialState, action);

        expect(nextState).toEqual(initialState);
    });

    it("set user to store when register", () => {
        const register = userReducer(initialState, doRegister(user));
        expect(register).toMatchObject(user);
    });

    it("set token when login", () => {
        const login = userReducer(initialState, doLogin({ token }));
        expect(login).toMatchObject({ token });
    });

    it("set users to store", () => {
        const users = userReducer(initialState, setUsers([user]));
        expect(users).toMatchObject({ users: [user] });
    });

    it("set profile/user to store", () => {
        const profile = userReducer(initialState, setProfile(user));
        expect(profile).toMatchObject(user);
    });

    it("should dispatch action correctly when get users", async () => {
        const dispatch = vi.fn();

        await asyncGetUsers(axios.get.mockResolvedValueOnce([user]))(dispatch);

        expect(dispatch).toHaveBeenCalledWith(showLoading(GET_USERS_LOADING));
        expect(dispatch).toHaveBeenCalledWith(getUsers());
        expect(dispatch).toHaveBeenCalledWith(setUsers([user]));
        expect(dispatch).toHaveBeenCalledWith(hideLoading(GET_USERS_LOADING));
    });

    it("should dispatch action correctly when get profile", async () => {
        const dispatch = vi.fn();

        await asyncGetProfile(axios.get.mockResolvedValueOnce(user))(dispatch);

        expect(dispatch).toHaveBeenCalledWith(showLoading());
        expect(dispatch).toHaveBeenCalledWith(setProfile(user));
        expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });

    it("should dispatch action correctly when register", async () => {
        const dispatch = vi.fn();

        await asyncDoRegister(axios.post.mockResolvedValueOnce(user))(dispatch);

        expect(dispatch).toHaveBeenCalledWith(showLoading());
        expect(dispatch).toHaveBeenCalledWith(doRegister(user));
        expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });

    it("should dispatch action correctly when login", async () => {
        const dispatch = vi.fn();

        await asyncDoLogin(axios.post.mockResolvedValueOnce({ token }), axios.post.mockResolvedValueOnce(user))(dispatch);

        expect(dispatch).toHaveBeenCalledWith(showLoading());
        expect(dispatch).toHaveBeenCalledWith(doLogin({ token }));
        expect(dispatch).toHaveBeenCalledWith(setProfile(user));
        expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });
});
