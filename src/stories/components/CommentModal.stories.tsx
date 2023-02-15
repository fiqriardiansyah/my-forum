import { configureStore } from "@reduxjs/toolkit";
import { ComponentStory } from "@storybook/react";
import CommentModal from "components/modals/comment";
import { loadingBarReducer } from "react-redux-loading-bar";
import MockEnvironment from "../lib/mock-environment";

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
    },
});

export default {
    title: "Components/Modals/Comment",
    component: CommentModal,
};

const Template: ComponentStory<typeof CommentModal> = (args) => (
    <CommentModal {...args}>{(comment) => <button onClick={comment.openHandler}>open modal comment</button>}</CommentModal>
);

export const Default = Template.bind({});
Default.args = {
    thread,
};
Default.decorators = [
    (Story) => (
        <MockEnvironment store={store}>
            <Story />
        </MockEnvironment>
    ),
];
