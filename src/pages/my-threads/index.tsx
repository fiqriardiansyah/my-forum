import NoThreadsImg from "assets/images/no-retweets.png";
import Thread from "components/thread";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { ReducerType } from "states";
import { USER_ID } from "utils/constant";
import { USER } from "utils/routes";

function MyThreads() {
    const { [USER_ID]: id } = useParams();
    const location = useLocation();
    const state = useSelector<ReducerType, ReducerType>((state) => state);
    const myThreads = state?.threads?.threads?.filter((thread) => thread.ownerId === ((id || state?.user?.id) as any));

    if (location.pathname.includes(USER) && !id) {
        return (
            <div className="flex flex-col items-center mb-20">
                <img src={NoThreadsImg} className="w-[400px] mt-10" alt="" />
                <div className="w-[50%] mt-10">
                    <h1 className="font-semibold m-0">No Threads</h1>
                    <p className="text-gray-400">Try open a discussion</p>
                </div>
            </div>
        );
    }

    return (
        <>
            {myThreads?.length !== 0 ? (
                myThreads?.map((thread) => <Thread key={thread.id} thread={thread} />)
            ) : (
                <div className="flex flex-col items-center mb-20">
                    <img src={NoThreadsImg} className="w-[400px] mt-10" alt="" />
                    <div className="w-[50%] mt-10">
                        <h1 className="font-semibold m-0">No Threads</h1>
                        <p className="text-gray-400">Try open a discussion</p>
                    </div>
                </div>
            )}
        </>
    );
}

export default MyThreads;
