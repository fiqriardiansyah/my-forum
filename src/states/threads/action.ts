import { CreateThread, Thread } from "models";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import endPoints from "service/end-points";

export default {};
export const ActionType = {
    GET_THREADS: "GET_THREADS",
    SET_THREADS: "SET_THREADS",
    SET_DOWN_VOUTE_THREAD: "SET_DOWN_VOUTE_THREAD",
    SET_UP_VOUTE_THREAD: "SET_UP_VOUTE_THREAD",
    SET_DOWN_VOUTE_THREAD_DETAIL: "SET_DOWN_VOUTE_THREAD_DETAIL",
    SET_UP_VOUTE_THREAD_DETAIL: "SET_UP_VOUTE_THREAD_DETAIL",
    SET_UP_VOUTE_COMMENT: "SET_UP_VOUTE_COMMENT",
    SET_DOWN_VOUTE_COMMENT: "SET_DOWN_VOUTE_COMMENT",
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

export const setUpVouteComment = (commentId: any, userId: any) => ({
    type: ActionType.SET_UP_VOUTE_COMMENT,
    payload: {
        commentId,
        userId,
    },
});

export const setDownVouteComment = (commentId: any, userId: any) => ({
    type: ActionType.SET_DOWN_VOUTE_COMMENT,
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

export const setDetailUpVoute = (threadId: any, userId: any) => ({
    type: ActionType.SET_UP_VOUTE_THREAD_DETAIL,
    payload: {
        threadId,
        userId,
    },
});

export const setDetailDownVoute = (threadId: any, userId: any) => ({
    type: ActionType.SET_DOWN_VOUTE_THREAD_DETAIL,
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

export const asyncGetDetailThread = (id: any) => async (dispatch: any) => {
    dispatch(showLoading(GET_THREAD_DETAIL));
    dispatch(getDetailThread());
    try {
        const thread = await endPoints.DetailThread({ thread_id: id });
        dispatch(setDetailThread(thread.data?.data?.detailThread || {}));
    } catch (e) {}
    dispatch(hideLoading(GET_THREAD_DETAIL));
};

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
