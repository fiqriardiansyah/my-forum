import { configureStore } from "@reduxjs/toolkit";
import AuthModal from "components/modals/auth";
import { loadingBarReducer } from "react-redux-loading-bar";
import MockEnvironment from "../lib/mock-environment";

const store = configureStore({
    reducer: {
        loadingBar: loadingBarReducer,
    },
});

export default {
    title: "Components/Modals/Auth",
    component: AuthModal,
    decorators: [
        (Story: any) => (
            <MockEnvironment store={store}>
                <Story />
            </MockEnvironment>
        ),
    ],
};

export const WhenClickLike = () => (
    <AuthModal>{(auth) => <button onClick={() => auth.openWithContentHandler("like")}>click like when not auth</button>}</AuthModal>
);

export const WhenClickDisLike = () => (
    <AuthModal>{(auth) => <button onClick={() => auth.openWithContentHandler("dislike")}>click dislike when not auth</button>}</AuthModal>
);

export const WhenClickComment = () => (
    <AuthModal>{(auth) => <button onClick={() => auth.openWithContentHandler("comment")}>click comment when not auth</button>}</AuthModal>
);
