import htmlParser from "html-react-parser";
import { Thread as ThreadType } from "models";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ReducerType } from "states";
import { asyncDisLikeThread, asyncLikeThread } from "states/votes/action";
import { EXPLORE, THREAD } from "utils/routes";
import ThreadAction from "./action";
import ThreadHeader from "./header";

export type Props = {
    thread: ThreadType;
};

const Thread = ({ thread }: Props) => {
    const navigate = useNavigate();
    const state = useSelector<ReducerType, ReducerType>((state) => state);
    const user = state.user?.users?.find((usr) => usr.id === thread.ownerId);
    const dispatch = useDispatch();

    const isLoading = (state.loadingBar as any)?.default !== 0 && !user;

    const onCLickHandler = (e: React.SyntheticEvent) => {
        e.stopPropagation();
        navigate(THREAD + "/" + thread.id);
    };

    const onLikeHandler = () => {
        dispatch(asyncLikeThread(thread) as any);
    };

    const onDisLikeHandler = () => {
        dispatch(asyncDisLikeThread(thread) as any);
    };

    return (
        <>
            <div className="w-full p-3 cursor-pointer hover:bg-gray-50 duration-200 border-bottom">
                <ThreadHeader
                    onClick={onCLickHandler}
                    isLoading={isLoading}
                    time={thread?.createdAt}
                    user={user}
                    description={
                        <>
                            <p className="font-medium m-0">{thread?.title}</p>
                            <div className="font-light text-gray-600 overflow-x-auto break-words mr-4 mt-4">
                                {htmlParser(thread?.body || "")} <br />
                            </div>
                        </>
                    }
                />
                <Link to={EXPLORE + "?search=%23" + thread?.category} className="no-underline hover:underline w-fit ml-16">
                    <span className="mt-1 text-primary font-medium">#{thread?.category}</span>
                </Link>
                <ThreadAction thread={thread} className="ml-14" onLikeHandler={onLikeHandler} onDisLikeHandler={onDisLikeHandler} />
            </div>
        </>
    );
};

export default Thread;
