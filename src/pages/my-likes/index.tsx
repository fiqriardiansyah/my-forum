import Thread from "components/thread";
import { useSelector } from "react-redux";
import { ReducerType } from "states";
import NoLikesImg from "assets/images/no-likes.png";
import { useLocation, useParams } from "react-router-dom";
import { USER_ID } from "utils/constant";
import { USER } from "utils/routes";

function MyLikes() {
    const { [USER_ID]: id } = useParams();
    const location = useLocation();
    const state = useSelector<ReducerType, ReducerType>((state) => state);

    const likes = state?.threads?.threads?.filter((thread) => thread.upVotesBy?.includes((id || state?.user?.id) as any));

    if (location.pathname?.includes(USER) && !id) {
        return (
            <div className="flex flex-col items-center mb-20">
                <img src={NoLikesImg} className="w-[400px] mt-10" alt="" />
                <div className="w-[50%] mt-10">
                    <h1 className="font-semibold">This user hasn’t liked any Discussion</h1>
                    <p className="text-gray-400">When they do, those Discussion will show up here.</p>
                </div>
            </div>
        );
    }

    return (
        <>
            {likes?.length !== 0 ? (
                likes?.map((thread) => <Thread key={thread.id} thread={thread} />)
            ) : (
                <div className="flex flex-col items-center mb-20">
                    <img src={NoLikesImg} className="w-[400px] mt-10" alt="" />
                    <div className="w-[50%] mt-10">
                        <h1 className="font-semibold">
                            {location.pathname?.includes(USER) ? "This user hasn’t liked any Discussion" : "You don’t have any likes yet"}
                        </h1>
                        <p className="text-gray-400">
                            {location.pathname?.includes(USER)
                                ? "When they do, those Discussion will show up here."
                                : "Tap the heart on any Discussion to show it some love. When you do, it’ll show up here."}
                        </p>
                    </div>
                </div>
            )}
        </>
    );
}

export default MyLikes;
