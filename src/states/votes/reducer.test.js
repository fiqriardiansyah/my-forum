import voteReducer from "./reducer";
import {
    asyncDisLikeComment,
    asyncDisLikeThread,
    asyncDisLikeThreadDetail,
    asyncLikeComment,
    asyncLikeThread,
    asyncLikeThreadDetail,
} from "./action";
import { setDetailDownVote, setDetailUpVote, setDownVote, setDownVoteComment, setUpVote, setUpVoteComment } from "../threads/action";
import { expect, vi } from "vitest";
import axios from "axios";
import { hideLoading, showLoading } from "react-redux-loading-bar";

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
    id: "john_doe",
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://generated-image-url.jpg",
};

const comment = {
    id: "comment-1",
    content: "Ini adalah komentar pertama",
    createdAt: "2021-06-21T07:00:00.000Z",
    owner: {
        id: "users-1",
        name: "John Doe",
        avatar: "https://generated-image-url.jpg",
    },
    upVotesBy: [],
    downVotesBy: [],
};

describe("voteReducer function", () => {
    let initialState;

    beforeEach(() => {
        initialState = {};
    });

    it("should return the initial state when given by unknown action", () => {
        const action = { type: "UNKNOWN" };

        const nextState = voteReducer(initialState, action);

        expect(nextState).toEqual(initialState);
    });

    it("should dispatch action correctly when upvote thread success then fail", async () => {
        const dispatch = vi.fn();

        const getState = () => ({ user });

        await asyncLikeThread(axios.post.mockRejectedValueOnce({}), thread)(dispatch, getState);

        expect(dispatch).toHaveBeenCalledWith(showLoading());
        expect(dispatch).toHaveBeenCalledWith(setUpVote(thread.id, user.id));
        expect(dispatch).toHaveBeenCalledWith(setDownVote(thread.id, user.id));
        expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });

    it("should dispatch action correctly when downvote thread success then fail", async () => {
        const dispatch = vi.fn();

        const getState = () => ({ user });

        await asyncDisLikeThread(axios.post.mockRejectedValueOnce({}), thread)(dispatch, getState);

        expect(dispatch).toHaveBeenCalledWith(showLoading());
        expect(dispatch).toHaveBeenCalledWith(setDownVote(thread.id, user.id));
        expect(dispatch).toHaveBeenCalledWith(setUpVote(thread.id, user.id));
        expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });

    it("should dispatch action correctly when upvote thread detail success then fail", async () => {
        const dispatch = vi.fn();

        const getState = () => ({ user });

        await asyncLikeThreadDetail(axios.post.mockRejectedValueOnce({}), thread)(dispatch, getState);

        expect(dispatch).toHaveBeenCalledWith(showLoading());
        expect(dispatch).toHaveBeenCalledWith(setDetailUpVote(thread.id, user.id));
        expect(dispatch).toHaveBeenCalledWith(setDetailDownVote(thread.id, user.id));
        expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });

    it("should dispatch action correctly when downvote thread detail success then fail", async () => {
        const dispatch = vi.fn();

        const getState = () => ({ user });

        await asyncDisLikeThreadDetail(axios.post.mockRejectedValueOnce({}), thread)(dispatch, getState);

        expect(dispatch).toHaveBeenCalledWith(showLoading());
        expect(dispatch).toHaveBeenCalledWith(setDetailDownVote(thread.id, user.id));
        expect(dispatch).toHaveBeenCalledWith(setDetailUpVote(thread.id, user.id));
        expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });

    it("should dispatch action correctly when upvote comment success then fail", async () => {
        const dispatch = vi.fn();

        const getState = () => ({ user });

        await asyncLikeComment(axios.post.mockRejectedValueOnce({}), comment)(dispatch, getState);

        expect(dispatch).toHaveBeenCalledWith(showLoading());
        expect(dispatch).toHaveBeenCalledWith(setUpVoteComment(comment.id, user.id));
        expect(dispatch).toHaveBeenCalledWith(setDownVoteComment(comment.id, user.id));
        expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });

    it("should dispatch action correctly when downvote comment success then fail", async () => {
        const dispatch = vi.fn();

        const getState = () => ({ user });

        await asyncDisLikeComment(axios.post.mockRejectedValueOnce({}), comment)(dispatch, getState);

        expect(dispatch).toHaveBeenCalledWith(showLoading());
        expect(dispatch).toHaveBeenCalledWith(setDownVoteComment(comment.id, user.id));
        expect(dispatch).toHaveBeenCalledWith(setUpVoteComment(comment.id, user.id));
        expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });
});
