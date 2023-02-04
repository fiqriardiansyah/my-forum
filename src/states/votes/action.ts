import { Comment, Thread } from "models";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import endPoints from "service/end-points";
import { ReducerType } from "states";
import { setDetailDownVoute, setDetailUpVoute, setDownVoute, setDownVouteComment, setUpVoute, setUpVouteComment } from "states/threads/action";

export default {};

export const ActionType = {};

export const asyncLikeThread = (thread?: Thread) => async (dispatch: any, getState: any) => {
    const { user } = getState() as ReducerType;

    dispatch(showLoading());
    dispatch(setUpVoute(thread?.id, user.id));
    try {
        await endPoints.UpVoteThread({ thread_id: thread?.id });
    } catch (e) {
        dispatch(setDownVoute(thread?.id, user.id));
    }
    dispatch(hideLoading());
};

export const asyncDisLikeThread = (thread?: Thread) => async (dispatch: any, getState: any) => {
    const { user } = getState() as ReducerType;

    dispatch(showLoading());
    dispatch(setDownVoute(thread?.id, user.id));
    try {
        await endPoints.DownVoteThread({ thread_id: thread?.id });
    } catch (e) {
        dispatch(setUpVoute(thread?.id, user.id));
    }
    dispatch(hideLoading());
};

export const asyncLikeThreadDetail = (thread?: Thread) => async (dispatch: any, getState: any) => {
    const { user } = getState() as ReducerType;

    dispatch(showLoading());
    dispatch(setDetailUpVoute(thread?.id, user.id));
    try {
        await endPoints.UpVoteThread({ thread_id: thread?.id });
    } catch (e) {
        dispatch(setDetailDownVoute(thread?.id, user.id));
    }
    dispatch(hideLoading());
};

export const asyncDisLikeThreadDetail = (thread?: Thread) => async (dispatch: any, getState: any) => {
    const { user } = getState() as ReducerType;

    dispatch(showLoading());
    dispatch(setDetailDownVoute(thread?.id, user.id));
    try {
        await endPoints.DownVoteThread({ thread_id: thread?.id });
    } catch (e) {
        dispatch(setDetailUpVoute(thread?.id, user.id));
    }
    dispatch(hideLoading());
};

export const asyncLikeComment = (thread?: Thread, comment?: Comment) => async (dispatch: any, getState: any) => {
    const { user } = getState() as ReducerType;

    dispatch(showLoading());
    dispatch(setUpVouteComment(comment?.id, user.id));
    try {
        await endPoints.UpVoteComment({ thread_id: thread?.id, comment_id: comment?.id });
    } catch (e) {
        dispatch(setDownVouteComment(comment?.id, user.id));
    }
    dispatch(hideLoading());
};

export const asyncDisLikeComment = (thread?: Thread, comment?: Comment) => async (dispatch: any, getState: any) => {
    const { user } = getState() as ReducerType;

    dispatch(showLoading());
    dispatch(setDownVouteComment(comment?.id, user.id));
    try {
        await endPoints.DownVoteComment({ thread_id: thread?.id, comment_id: comment?.id });
    } catch (e) {
        dispatch(setUpVouteComment(comment?.id, user.id));
    }
    dispatch(hideLoading());
};
