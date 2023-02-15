import { configureStore } from "@reduxjs/toolkit";
import ExploreHeader from "modules/explore/header";
import { loadingBarReducer } from "react-redux-loading-bar";
import MockEnvironment from "stories/lib/mock-environment";

export default {
    title: "Modules/Explore/Header",
    component: ExploreHeader,
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

const user = {
    id: "users-1",
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://source.unsplash.com/random/100x100",
};

const store = configureStore({
    reducer: {
        loadingBar: loadingBarReducer,
        user: () => ({
            ...user,
            users: [user],
        }),
        threads: () => ({
            threads: [thread],
        }),
    },
});

export const Default = () => (
    <MockEnvironment store={store}>
        <ExploreHeader />
    </MockEnvironment>
);
