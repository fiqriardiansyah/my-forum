import { useEffect } from "react";
import Header from "components/layout/header";
import { useDispatch, useSelector } from "react-redux";
import { ReducerType } from "states";
import { asyncGetThreads } from "states/threads/action";
import { asyncGetUsers } from "states/users/action";
import Thread from "components/thread";
import Speak from "components/speak";
import endPoints from "service/end-points";

function Home() {
    const state = useSelector<ReducerType, ReducerType>((state) => state);
    const dispatch = useDispatch();

    const getThreads = async () => (await endPoints.Threads()).data.data.threads;
    const getUsers = async () => (await endPoints.Users()).data.data.users;

    useEffect(() => {
        dispatch(asyncGetThreads(getThreads) as any);
        dispatch(asyncGetUsers(getUsers) as any);
    }, []);

    return (
        <>
            <Header title="Home" />
            {state?.user?.id && <Speak />}
            {state.threads?.threads?.map((thread) => (
                <Thread key={thread.id} thread={thread} />
            ))}
        </>
    );
}

export default Home;
