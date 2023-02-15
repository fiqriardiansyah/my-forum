import { configureStore } from "@reduxjs/toolkit";
import LoginInput from "modules/auth/login-input";
import { loadingBarReducer } from "react-redux-loading-bar";
import MockEnvironment from "stories/lib/mock-environment";

export default {
    title: "Modules/Auth/LoginInput",
    component: LoginInput,
};

const store = configureStore({
    reducer: {
        loadingBar: loadingBarReducer,
    },
});

export const Default = () => (
    <MockEnvironment store={store}>
        <LoginInput onSubmit={() => {}} />
    </MockEnvironment>
);
