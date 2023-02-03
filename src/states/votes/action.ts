import { Thread } from "models";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import endPoints from "service/end-points";
import { ReducerType } from "states";
import { setDownVoute, setUpVoute } from "states/threads/action";

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
