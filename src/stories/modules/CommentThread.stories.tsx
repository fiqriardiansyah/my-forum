import { configureStore } from "@reduxjs/toolkit";
import { loadingBarReducer } from "react-redux-loading-bar";
import MockEnvironment from "stories/lib/mock-environment";
import Comment from "modules/thread/comment";

export default {
    title: "Modules/Thread/Comment",
    component: Comment,
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

const comment = {
    id: "comment-1",
    content: "Ini adalah komentar pertama",
    createdAt: "2021-06-21T07:00:00.000Z",
    upVotesBy: [],
    downVotesBy: [],
    owner: {
        id: "users-1",
        name: "John Doe",
        email: "john@example.com",
        avatar: "https://source.unsplash.com/random/100x100",
    },
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
        <Comment comment={comment} thread={thread} />
    </MockEnvironment>
);
