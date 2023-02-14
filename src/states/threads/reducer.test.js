import threadsReducer from "./reducer";
import { expect, vi } from "vitest";
import axios from "axios";
import {
    ActionType,
    asyncCreateThread,
    asyncGetDetailThread,
    asyncGetThreads,
    createThread,
    CREATE_LOADING,
    failComment,
    getDetailThread,
    getThreads,
    GET_THREADS_LOADING,
    GET_THREAD_DETAIL,
    setDetailDownVote,
    setDetailThread,
    setDetailUpVote,
    setDownVote,
    setDownVoteComment,
    setThreads,
    setUpVote,
    setUpVoteComment,
    successComment,
} from "./action";
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

const detailThread = {
    id: "thread-1",
    title: "Thread Pertama",
    body: "Ini adalah thread pertama",
    category: "General",
    createdAt: "2021-06-21T07:00:00.000Z",
    owner: {
        id: "users-1",
        name: "John Doe",
        avatar: "https://generated-image-url.jpg",
    },
    upVotesBy: [],
    downVotesBy: [],
    comments: [
        {
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
        },
    ],
};

/**
 * - threadsReducer function
 *      - should return the initial state when given by unknown action
 *      - thread must be null when clean detail thread
 *      - increment total comment and decrement when fail
 *      - upvote and downvote thread when user in homepage
 *      - upvote and downvote thread when user in detail page
 *      - set detail thread to store
 *      - set threads to store
 *      - upvote and downvote comment
 *      - should dispatch action correctly when detail thread fetching success (thunk)
 *      - should dispatch action correctly when threads fetching success (thunk)
 *      - should dispatch action correctly when create thread success (thunk)
 */

describe("threadsReducer function", () => {
    let initialState;

    beforeEach(() => {
        initialState = {
            thread: detailThread,
            threads: [thread],
        };
    });

    it("should return the initial state when given by unknown action", () => {
        const action = { type: "UNKNOWN" };

        const nextState = threadsReducer(initialState, action);

        expect(nextState).toEqual(initialState);
    });

    it("thread must be null when clean detail thread", () => {
        const action = { type: ActionType.CLEAN_DETAIL_THREAD };

        const nextState = threadsReducer(initialState, action);

        expect(nextState.thread).toEqual(null);
    });

    it("increment total comment and decrement when fail", () => {
        const whenLikeComment = threadsReducer(initialState, successComment("thread-1", "content"));

        expect(whenLikeComment.threads[0].totalComments).equal(1);

        const whenDisLikeComment = threadsReducer(whenLikeComment, failComment("thread-1", "contennt"));

        expect(whenDisLikeComment.threads[0].totalComments).equal(0);
    });

    it("upvote and downvote thread when user in homepage", () => {
        const whenUpvote = threadsReducer(initialState, setUpVote("thread-1", "user-1"));

        expect(whenUpvote.threads[0]).toMatchObject({ upVotesBy: ["user-1"] });
        expect(whenUpvote.threads[0]).toMatchObject({ downVotesBy: [] });

        const whenDownvote = threadsReducer(whenUpvote, setDownVote("thread-1", "user-1"));

        expect(whenDownvote.threads[0]).toMatchObject({ upVotesBy: [] });
        expect(whenDownvote.threads[0]).toMatchObject({ downVotesBy: ["user-1"] });
    });

    it("upvote and downvote thread when user in detail page", () => {
        const whenUpvote = threadsReducer(initialState, setDetailUpVote("thread-1", "user-1"));

        expect(whenUpvote.thread).toMatchObject({ upVotesBy: ["user-1"] });
        expect(whenUpvote.thread).toMatchObject({ downVotesBy: [] });

        const whenDownvote = threadsReducer(whenUpvote, setDetailDownVote("thread-1", "user-1"));

        expect(whenDownvote.thread).toMatchObject({ upVotesBy: [] });
        expect(whenDownvote.thread).toMatchObject({ downVotesBy: ["user-1"] });
    });

    it("set detail thread to store", () => {
        const setThread = threadsReducer({}, setDetailThread(thread));
        expect(setThread).toMatchObject({ thread });
    });

    it("set threads to store", () => {
        const threads = threadsReducer({}, setThreads(initialState.threads));
        expect(threads).toMatchObject({ threads: initialState.threads });
    });

    it("upvote and downvote comment", () => {
        const whenUpvote = threadsReducer(initialState, setUpVoteComment("comment-1", "user-1"));
        expect(whenUpvote.thread.comments[0]).toMatchObject({ upVotesBy: ["user-1"] });
        expect(whenUpvote.thread.comments[0]).toMatchObject({ downVotesBy: [] });

        const whenDownVote = threadsReducer(whenUpvote, setDownVoteComment("comment-1", "user-1"));
        expect(whenDownVote.thread.comments[0]).toMatchObject({ upVotesBy: [] });
        expect(whenDownVote.thread.comments[0]).toMatchObject({ downVotesBy: ["user-1"] });
    });

    it("should dispatch action correctly when detail thread fetching success", async () => {
        const dispatch = vi.fn();

        await asyncGetDetailThread(axios.get.mockResolvedValueOnce(detailThread))(dispatch);

        expect(dispatch).toHaveBeenCalledWith(showLoading(GET_THREAD_DETAIL));
        expect(dispatch).toHaveBeenCalledWith(getDetailThread());
        expect(dispatch).toHaveBeenCalledWith(setDetailThread(detailThread));
        expect(dispatch).toHaveBeenCalledWith(hideLoading(GET_THREAD_DETAIL));
    });

    it("should dispatch action correctly when threads fetching success", async () => {
        const dispatch = vi.fn();

        await asyncGetThreads(axios.get.mockResolvedValueOnce(initialState.threads))(dispatch);

        expect(dispatch).toHaveBeenCalledWith(showLoading(GET_THREADS_LOADING));
        expect(dispatch).toHaveBeenCalledWith(getThreads());
        expect(dispatch).toHaveBeenCalledWith(setThreads(initialState.threads));
        expect(dispatch).toHaveBeenCalledWith(hideLoading(GET_THREADS_LOADING));
    });

    it("should dispatch action correctly when create thread success", async () => {
        const dispatch = vi.fn();

        await asyncCreateThread(axios.post.mockResolvedValueOnce(thread))(dispatch);

        expect(dispatch).toHaveBeenCalledWith(showLoading(CREATE_LOADING));
        expect(dispatch).toHaveBeenCalledWith(createThread());
        expect(dispatch).toHaveBeenCalledWith(hideLoading(CREATE_LOADING));
    });
});
