import { configureStore } from "@reduxjs/toolkit";
import Speak from "components/speak";
import { loadingBarReducer } from "react-redux-loading-bar";
import MockEnvironment from "../lib/mock-environment";

const user = {
    id: "users-1",
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://source.unsplash.com/random/100x100",
};

const thread = {
    id: "thread-1",
    title: "Thread Pertama",
    body: "Ini adalah thread pertama",
    category: "General",
    createdAt: "2021-06-21T07:00:00.000Z",
    ownerId: "users-1",
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0,
};

export default {
    title: "Components/Speak",
    component: Speak,
};

const store = configureStore({
    reducer: {
        loadingBar: loadingBarReducer,
        user: () => ({
            ...user,
        }),
        threads: () => ({
            threads: [thread],
        }),
    },
});

export const Default = () => {
    return (
        <MockEnvironment store={store}>
            <Speak onSpeakHandler={() => {}} />
        </MockEnvironment>
    );
};
