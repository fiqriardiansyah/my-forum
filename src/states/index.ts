import { AnyAction, configureStore, Reducer } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { loadingBarReducer } from "react-redux-loading-bar";
import { TOKEN } from "utils/constant";
import leaderboardsReducer, { SelectorLeaderboard } from "./leaderboards/reducer";
import threadsReducer, { SelectorThreads } from "./threads/reducer";
import userReducer, { SelectorUser } from "./users/reducer";
import vouteReducer, { SelectorVoutes } from "./votes/reducer";

export type ReducerType = {
    loadingBar: Reducer<any, AnyAction>;
    user: SelectorUser;
    leaderboards: SelectorLeaderboard;
    threads: SelectorThreads;
    voute: SelectorVoutes;
};

const store = configureStore<ReducerType>({
    reducer: {
        loadingBar: loadingBarReducer,
        user: userReducer,
        leaderboards: leaderboardsReducer,
        threads: threadsReducer,
        voute: vouteReducer,
    },
    preloadedState: {
        user: {
            token: Cookies.get(TOKEN) || "",
        },
    },
});

export default store;
