import { Avatar, List } from "antd";
import { useEffect } from "react";
import Header from "components/header";
import { useDispatch, useSelector } from "react-redux";
import { ReducerType } from "states";
import { asyncGetLeaderboards } from "states/leaderboards/action";
import Leaderboard from "components/leaderboard";

function LeaderBoards() {
    const state = useSelector<ReducerType, ReducerType>((state) => state);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(asyncGetLeaderboards() as any);
    }, []);

    const isLoading = (state.loadingBar as any)?.default !== 0;

    return (
        <div className="w-full h-screen overflow-y-auto relative">
            <Header title="Leaderboards" />
            {isLoading && [...new Array(3)].map((_, i) => <Leaderboard.Loading key={i} />)}
            {!isLoading && state.leaderboards?.leaderboards?.map((leaderboard, i) => <Leaderboard key={i} leaderboard={leaderboard} />)}
        </div>
    );
}

export default LeaderBoards;
