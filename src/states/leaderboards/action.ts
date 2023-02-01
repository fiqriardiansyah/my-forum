import { LeaderBoard } from "models";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import endPoints from "service/end-points";

export default {};
export const ActionType = {
    GET_LEADERBOARDS: "GET_LEADERBOARDS",
    SET_LEADERBOARDS: "SET_LEADERBOARDS",
};

export const setLeaderboards = (leaderboards: LeaderBoard[]) => ({
    type: ActionType.SET_LEADERBOARDS,
    payload: {
        leaderboards,
    },
});

export const getLeaderboards = () => ({
    type: ActionType.GET_LEADERBOARDS,
});

export const asyncGetLeaderboards = () => async (dispatch: any) => {
    dispatch(showLoading());
    dispatch(getLeaderboards());
    try {
        const leaderboards = await endPoints.Leaderboards();
        dispatch(setLeaderboards(leaderboards.data.data?.leaderboards || []));
    } catch (e) {}
    dispatch(hideLoading());
};
