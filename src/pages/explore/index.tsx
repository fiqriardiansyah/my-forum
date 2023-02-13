import Thread from "components/thread";
import ExploreHeader from "modules/explore/header";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { ReducerType } from "states";
import { SEARCH } from "utils/constant";

import NoResultImg from "assets/images/no-result.png";
import { useEffect } from "react";
import { asyncGetUsers } from "states/users/action";
import { asyncGetThreads } from "states/threads/action";
import endPoints from "service/end-points";

function Explore() {
    const [params] = useSearchParams();
    const state = useSelector<ReducerType, ReducerType>((state) => state);
    const dispatch = useDispatch();

    const query = params.get(SEARCH) || "";

    const tagBased = state?.threads?.threads?.filter((thread) => thread.category?.toLowerCase() === query?.split("#")[1]?.toLowerCase());
    const freeBased = state?.threads?.threads?.filter(
        (thread) => thread.body?.includes(query) || thread?.title?.includes(query) || thread?.category?.includes(query)
    );

    const results = query[0] === "#" ? tagBased : freeBased;

    const getThreads = async () => (await endPoints.Threads()).data.data.threads;
    const getUsers = async () => (await endPoints.Users()).data.data.users;

    useEffect(() => {
        dispatch(asyncGetThreads(getThreads) as any);
        dispatch(asyncGetUsers(getUsers) as any);
    }, []);

    return (
        <>
            <ExploreHeader />
            {query && results?.map((thread) => <Thread key={thread.id} thread={thread} />)}
            {query && !results?.length && (
                <div className="flex flex-col items-center">
                    <img src={NoResultImg} className="object-contain mt-10" alt="" />
                    <div className="w-[50%] mt-10">
                        <h1 className="font-semibold">
                            No result for <br /> {`"${query}"`}
                        </h1>
                        <p className="text-gray-400">
                            Try searching for something else, or check your Search settings to see if they’re protecting you from potentially
                            sensitive content.
                        </p>
                    </div>
                </div>
            )}
        </>
    );
}

export default Explore;
