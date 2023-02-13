import { Thread } from "models";
import { hideLoading, showLoading } from "react-redux-loading-bar";

export default {};
export const ActionType = {
    GET_THREADS: "GET_THREADS",
    SET_THREADS: "SET_THREADS",
    SET_DOWN_VOTE_THREAD: "SET_DOWN_VOTE_THREAD",
    SET_UP_VOTE_THREAD: "SET_UP_VOTE_THREAD",
    SET_DOWN_VOTE_THREAD_DETAIL: "SET_DOWN_VOTE_THREAD_DETAIL",
    SET_UP_VOTE_THREAD_DETAIL: "SET_UP_VOTE_THREAD_DETAIL",
    SET_UP_VOTE_COMMENT: "SET_UP_VOTE_COMMENT",
    SET_DOWN_VOTE_COMMENT: "SET_DOWN_VOTE_COMMENT",
    SUCCESS_COMMENT: "SUCCESS_COMMENT",
    FAIL_COMMENT: "FAIL_COMMENT",
    CREATE_THREAD: "CREATE_THREAD",
    GET_DETAIL_THREAD: "GET_DETAIL_THREAD",
    SET_DETAIL_THREAD: "SET_DETAIL_THREAD",
    CLEAN_DETAIL_THREAD: "CLEAN_DETAIL_THREAD",
};

export const CREATE_LOADING = "CREATE_LOADING";
export const GET_THREADS_LOADING = "GET_THREADS_LOADING";
export const GET_THREAD_DETAIL = "GET_THREAD_DETAIL";

export const setUpVoteComment = (commentId: any, userId: any) => ({
    type: ActionType.SET_UP_VOTE_COMMENT,
    payload: {
        commentId,
        userId,
    },
});

export const setDownVoteComment = (commentId: any, userId: any) => ({
    type: ActionType.SET_DOWN_VOTE_COMMENT,
    payload: {
        commentId,
        userId,
    },
});

export const cleanDetailThread = () => ({
    type: ActionType.CLEAN_DETAIL_THREAD,
});

export const getDetailThread = () => ({
    type: ActionType.GET_DETAIL_THREAD,
});

export const setDetailThread = (thread: Thread) => ({
    type: ActionType.SET_DETAIL_THREAD,
    payload: {
        thread,
    },
});

export const failComment = (threadId: any, content: any) => ({
    type: ActionType.FAIL_COMMENT,
    payload: {
        threadId,
        content,
    },
});

export const successComment = (threadId: any, content: any) => ({
    type: ActionType.SUCCESS_COMMENT,
    payload: {
        threadId,
        content,
    },
});

export const setUpVote = (threadId: any, userId: any) => ({
    type: ActionType.SET_UP_VOTE_THREAD,
    payload: {
        threadId,
        userId,
    },
});

export const setDownVote = (threadId: any, userId: any) => ({
    type: ActionType.SET_DOWN_VOTE_THREAD,
    payload: {
        threadId,
        userId,
    },
});

export const setDetailUpVote = (threadId: any, userId: any) => ({
    type: ActionType.SET_UP_VOTE_THREAD_DETAIL,
    payload: {
        threadId,
        userId,
    },
});

export const setDetailDownVote = (threadId: any, userId: any) => ({
    type: ActionType.SET_DOWN_VOTE_THREAD_DETAIL,
    payload: {
        threadId,
        userId,
    },
});

export const setThreads = (threads: Thread[]) => ({
    type: ActionType.SET_THREADS,
    payload: {
        threads,
    },
});

export const getThreads = () => ({
    type: ActionType.GET_THREADS,
});

export const createThread = () => ({
    type: ActionType.CREATE_THREAD,
});

export const asyncGetDetailThread = (caller: () => Promise<Thread>) => async (dispatch: any) => {
    dispatch(showLoading(GET_THREAD_DETAIL));
    dispatch(getDetailThread());
    try {
        const thread = await caller();
        dispatch(setDetailThread(thread));
    } catch (e) {}
    dispatch(hideLoading(GET_THREAD_DETAIL));
};

export const asyncGetThreads = (caller: () => Promise<Thread[]>) => async (dispatch: any) => {
    dispatch(showLoading(GET_THREADS_LOADING));
    dispatch(getThreads());
    try {
        const threads = await caller();
        dispatch(setThreads(threads));
    } catch (e) {}
    dispatch(hideLoading(GET_THREADS_LOADING));
};

export const asyncCreateThread = (caller: () => Promise<Thread>, callback: any) => async (dispatch: any) => {
    dispatch(showLoading(CREATE_LOADING));
    dispatch(createThread());
    try {
        await caller();
        callback();
    } catch (e) {}
    dispatch(hideLoading(CREATE_LOADING));
};
