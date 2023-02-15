import { configureStore } from "@reduxjs/toolkit";
import Register from "modules/auth/register-input";
import { loadingBarReducer } from "react-redux-loading-bar";
import MockEnvironment from "stories/lib/mock-environment";

export default {
    title: "Modules/Auth/RegisterInput",
    component: Register,
};

const store = configureStore({
    reducer: {
        loadingBar: loadingBarReducer,
    },
});

export const Default = () => (
    <MockEnvironment store={store}>
        <Register onSubmit={() => {}} />
    </MockEnvironment>
);
