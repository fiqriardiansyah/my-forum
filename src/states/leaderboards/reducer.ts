import { LeaderBoard } from "models";
import { ActionType } from "./action";

export interface SelectorLeaderboard {
    leaderboards: LeaderBoard[];
}
function leaderboardsReducer(state: SelectorLeaderboard | null = null, action: any = {}) {
    switch (action.type) {
        case ActionType.SET_LEADERBOARDS:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}
export default leaderboardsReducer;
