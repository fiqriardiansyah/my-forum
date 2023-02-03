import ButtonBack from "components/button/back";
import Header from "components/layout/header";
import ThreadAction from "components/thread/action";
import ThreadHeader from "components/thread/header";
import dayjs from "dayjs";
import htmlParser from "html-react-parser";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ReducerType } from "states";
import { asyncGetThreads } from "states/threads/action";
import { asyncGetUsers } from "states/users/action";
import { THREAD_ID } from "utils/constant";
import { EXPLORE } from "utils/routes";

function Thread() {
    const { [THREAD_ID]: id } = useParams();
    const navigate = useNavigate();
    const state = useSelector<ReducerType, ReducerType>((state) => state);
    const dispatch = useDispatch();

    const backHandler = () => {
        navigate(-1);
    };

    useEffect(() => {
        dispatch(asyncGetThreads() as any);
        dispatch(asyncGetUsers() as any);
    }, []);

    const isLoading = (state?.loadingBar as any)?.GET_THREADS_LOADING || (state?.loadingBar as any)?.GET_USERS_LOADING;
    const thread = state?.threads?.threads?.find((th) => th.id === id);
    const user = state?.user?.users?.find((usr) => usr.id === thread?.ownerId);

    return (
        <>
            <Header>
                <div className="w-full flex items-center gap-9">
                    <ButtonBack title="Back" onClick={backHandler} />
                    <p className="font-semibold m-0 leading-5">Threads</p>
                </div>
            </Header>
            <div className="w-full flex flex-col p-4">
                <ThreadHeader
                    isLoading={isLoading}
                    thread={thread}
                    user={user}
                    description={
                        <p className="font-medium m-0">
                            {thread?.title}
                            <Link to={EXPLORE + "?search=%23" + thread?.category} className="no-underline hover:underline w-fit ml-4">
                                <span className="mt-1 text-primary font-medium">#{thread?.category}</span>
                            </Link>
                        </p>
                    }
                />
                <div className="font-light text-gray-600 overflow-x-auto break-words mr-4 mt-3">
                    {htmlParser(thread?.body || "")} <br />
                </div>
                <span className="font-normal text-gray-400">{dayjs(thread?.createdAt).format("HH:mm . MMM D, yyyy")}</span>
                <ThreadAction thread={thread} comment={false} className="!w-full !justify-around border-bottom border-top" />
            </div>
        </>
    );
}

export default Thread;
