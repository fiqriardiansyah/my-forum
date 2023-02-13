import { LeaderBoard } from "models";
import { hideLoading, showLoading } from "react-redux-loading-bar";

export default {};
export const ActionType = {
    GET_LEADERBOARDS: "GET_LEADERBOARDS",
    SET_LEADERBOARDS: "SET_LEADERBOARDS",
};

export const LEADERBOARD_LOADING = "LEADERBOARD_LOADING";

export const setLeaderboards = (leaderboards: LeaderBoard[]) => ({
    type: ActionType.SET_LEADERBOARDS,
    payload: {
        leaderboards,
    },
});

export const getLeaderboards = () => ({
    type: ActionType.GET_LEADERBOARDS,
});

export const asyncGetLeaderboards = (caller: () => Promise<LeaderBoard[]>) => async (dispatch: any) => {
    dispatch(showLoading(LEADERBOARD_LOADING));
    dispatch(getLeaderboards());
    try {
        const leaderboards = await caller();
        dispatch(setLeaderboards(leaderboards));
    } catch (e) {}
    dispatch(hideLoading(LEADERBOARD_LOADING));
};
