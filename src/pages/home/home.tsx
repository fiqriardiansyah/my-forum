import { useEffect } from "react";
import Header from "components/header";
import { useDispatch, useSelector } from "react-redux";
import { ReducerType } from "states";
import { asyncGetThreads } from "states/threads/action";
import { asyncGetUsers } from "states/users/action";
import Thread from "components/thread";

function Home() {
    const state = useSelector<ReducerType, ReducerType>((state) => state);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(asyncGetThreads() as any);
        dispatch(asyncGetUsers() as any);
    }, []);

    return (
        <div className="w-full h-screen overflow-y-auto relative">
            <Header title="Home" />
            {state.threads?.threads?.map((thread) => (
                <Thread key={thread.id} thread={thread} />
            ))}
        </div>
    );
}

export default Home;
