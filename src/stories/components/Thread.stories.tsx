import { configureStore } from "@reduxjs/toolkit";
import Thread from "components/thread";
import ThreadAction from "components/thread/action";
import ThreadHeader from "components/thread/header";
import { loadingBarReducer } from "react-redux-loading-bar";
import MockEnvironment from "../lib/mock-environment";

export default {
    title: "Components/Thread",
    component: Thread,
};

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
        <Thread thread={thread} />
    </MockEnvironment>
);

export const Header = () => (
    <MockEnvironment store={store}>
        <ThreadHeader
            className="thread-header"
            onClick={() => {}}
            isLoading={false}
            user={user}
            time="2021-06-21T07:00:00.000Z"
            description={<p className="font-medium m-0">{thread?.title}</p>}
        />
    </MockEnvironment>
);

export const Action = () => (
    <MockEnvironment store={store}>
        <ThreadAction thread={thread} />
    </MockEnvironment>
);
