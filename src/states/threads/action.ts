import { CreateThread, Thread } from "models";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import endPoints from "service/end-points";

export default {};
export const ActionType = {
    GET_THREADS: "GET_THREADS",
    SET_THREADS: "SET_THREADS",
    SET_DOWN_VOUTE_THREAD: "SET_DOWN_VOUTE_THREAD",
    SET_UP_VOUTE_THREAD: "SET_UP_VOUTE_THREAD",
    SUCCESS_COMMENT: "SUCCESS_COMMENT",
    FAIL_COMMENT: "FAIL_COMMENT",
    CREATE_THREAD: "CREATE_THREAD",
};

export const CREATE_LOADING = "CREATE_LOADING";
export const GET_THREADS_LOADING = "GET_THREADS_LOADING";

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

export const setUpVoute = (threadId: any, userId: any) => ({
    type: ActionType.SET_UP_VOUTE_THREAD,
    payload: {
        threadId,
        userId,
    },
});

export const setDownVoute = (threadId: any, userId: any) => ({
    type: ActionType.SET_DOWN_VOUTE_THREAD,
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

export const asyncGetThreads = () => async (dispatch: any) => {
    dispatch(showLoading(GET_THREADS_LOADING));
    dispatch(getThreads());
    try {
        const threads = await endPoints.Threads();
        dispatch(setThreads(threads.data.data?.threads || []));
    } catch (e) {}
    dispatch(hideLoading(GET_THREADS_LOADING));
};

export const createThread = () => ({
    type: ActionType.CREATE_THREAD,
});

export const asyncCreateThread = (data: CreateThread) => async (dispatch: any) => {
    dispatch(showLoading(CREATE_LOADING));
    dispatch(createThread());
    try {
        await endPoints.CreateThread(data);
        dispatch(asyncGetThreads());
    } catch (e) {}
    dispatch(hideLoading(CREATE_LOADING));
};
