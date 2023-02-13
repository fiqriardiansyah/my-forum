import { Comment, Thread } from "models";
import { hideLoading, showLoading } from "react-redux-loading-bar";
import { ReducerType } from "states";
import { setDetailDownVote, setDetailUpVote, setDownVote, setDownVoteComment, setUpVote, setUpVoteComment } from "states/threads/action";

export default {};

export const ActionType = {};

export const asyncLikeThread = (caller: () => Promise<any>, thread: Thread) => async (dispatch: any, getState: any) => {
    const { user } = getState() as ReducerType;

    dispatch(showLoading());
    dispatch(setUpVote(thread?.id, user.id));
    try {
        await caller();
    } catch (e) {
        dispatch(setDownVote(thread?.id, user.id));
    }
    dispatch(hideLoading());
};

export const asyncDisLikeThread = (caller: () => Promise<any>, thread?: Thread) => async (dispatch: any, getState: any) => {
    const { user } = getState() as ReducerType;

    dispatch(showLoading());
    dispatch(setDownVote(thread?.id, user.id));
    try {
        await caller();
    } catch (e) {
        dispatch(setUpVote(thread?.id, user.id));
    }
    dispatch(hideLoading());
};

export const asyncLikeThreadDetail = (caller: () => Promise<any>, thread?: Thread) => async (dispatch: any, getState: any) => {
    const { user } = getState() as ReducerType;

    dispatch(showLoading());
    dispatch(setDetailUpVote(thread?.id, user.id));
    try {
        await caller();
    } catch (e) {
        dispatch(setDetailDownVote(thread?.id, user.id));
    }
    dispatch(hideLoading());
};

export const asyncDisLikeThreadDetail = (caller: () => Promise<any>, thread?: Thread) => async (dispatch: any, getState: any) => {
    const { user } = getState() as ReducerType;

    dispatch(showLoading());
    dispatch(setDetailDownVote(thread?.id, user.id));
    try {
        await caller();
    } catch (e) {
        dispatch(setDetailUpVote(thread?.id, user.id));
    }
    dispatch(hideLoading());
};

export const asyncLikeComment = (caller: () => Promise<any>, comment?: Comment) => async (dispatch: any, getState: any) => {
    const { user } = getState() as ReducerType;

    dispatch(showLoading());
    dispatch(setUpVoteComment(comment?.id, user.id));
    try {
        await caller();
    } catch (e) {
        dispatch(setDownVoteComment(comment?.id, user.id));
    }
    dispatch(hideLoading());
};

export const asyncDisLikeComment = (caller: () => Promise<any>, comment?: Comment) => async (dispatch: any, getState: any) => {
    const { user } = getState() as ReducerType;

    dispatch(showLoading());
    dispatch(setDownVoteComment(comment?.id, user.id));
    try {
        await caller();
    } catch (e) {
        dispatch(setUpVoteComment(comment?.id, user.id));
    }
    dispatch(hideLoading());
};
