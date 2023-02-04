import Header from "components/layout/header";
import ThreadHeader from "components/thread/header";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingBar from "react-redux-loading-bar";
import { ReducerType } from "states";
import { asyncGetLeaderboards, LEADERBOARD_LOADING } from "states/leaderboards/action";

function LeaderBoards() {
    const state = useSelector<ReducerType, ReducerType>((state) => state);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(asyncGetLeaderboards() as any);
    }, []);

    const isLoading = (state.loadingBar as any)?.LEADERBOARD_LOADING;

    return (
        <>
            <LoadingBar style={{ background: "#1DA1F2", zIndex: "20" }} scope={LEADERBOARD_LOADING} />
            <Header title="Leaderboards" />
            {isLoading ? [...new Array(3)].map((_, i) => <ThreadHeader isLoading key={i} className="p-4" />) : null}
            {!isLoading &&
                state.leaderboards?.leaderboards?.map((leaderboard, i) => (
                    <ThreadHeader
                        className="border-bottom p-4 py-2"
                        key={i}
                        user={leaderboard?.user}
                        description={<p className="m-0 text-gray-400">{leaderboard?.score} Points</p>}
                    />
                ))}
        </>
    );
}

export default LeaderBoards;
