import { useEffect } from "react";
import Header from "components/layout/header";
import { useDispatch, useSelector } from "react-redux";
import { ReducerType } from "states";
import { asyncGetThreads } from "states/threads/action";
import { asyncGetUsers } from "states/users/action";
import Thread from "components/thread";
import Speak from "components/speak";

function Home() {
    const state = useSelector<ReducerType, ReducerType>((state) => state);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(asyncGetThreads() as any);
        dispatch(asyncGetUsers() as any);
    }, []);

    return (
        <>
            <Header title="Home" />
            <Speak />
            {state.threads?.threads?.map((thread) => (
                <Thread key={thread.id} thread={thread} />
            ))}
        </>
    );
}

export default Home;
