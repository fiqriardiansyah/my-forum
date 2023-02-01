import { Thread } from "models";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import endPoints from "service/end-points";

export default {};
export const ActionType = {
    GET_THREADS: "GET_THREADS",
    SET_THREADS: "SET_THREADS",
    SET_DOWN_VOUTE_THREAD: "SET_DOWN_VOUTE_THREAD",
    SET_UP_VOUTE_THREAD: "SET_UP_VOUTE_THREAD",
};

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
    dispatch(showLoading());
    dispatch(getThreads());
    try {
        const threads = await endPoints.Threads();
        dispatch(setThreads(threads.data.data?.threads || []));
    } catch (e) {}
    dispatch(hideLoading());
};
