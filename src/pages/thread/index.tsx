import ButtonBack from "components/button/back";
import Header from "components/layout/header";
import LoadingBar from "react-redux-loading-bar";
import ThreadAction from "components/thread/action";
import ThreadHeader from "components/thread/header";
import dayjs from "dayjs";
import htmlParser from "html-react-parser";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ReducerType } from "states";
import { asyncGetDetailThread, GET_THREAD_DETAIL } from "states/threads/action";
import { asyncDisLikeThreadDetail, asyncLikeThreadDetail } from "states/votes/action";
import { THREAD_ID } from "utils/constant";
import { EXPLORE } from "utils/routes";
import Comment from "modules/thread/comment";
import endPoints from "service/end-points";
import { Thread as ThreadModel } from "models";

function Thread() {
    const { [THREAD_ID]: id } = useParams();
    const navigate = useNavigate();
    const state = useSelector<ReducerType, ReducerType>((state) => state);
    const dispatch = useDispatch();

    const backHandler = () => {
        navigate(-1);
    };

    const getDetailThread = async () => (await endPoints.DetailThread({ thread_id: id })).data.data.detailThread;

    useEffect(() => {
        dispatch(asyncGetDetailThread(getDetailThread) as any);
    }, []);

    const isLoading = (state?.loadingBar as any)?.GET_THREAD_DETAIL;
    const thread = state?.threads?.thread;

    const upvote = async (thread: ThreadModel) => (await endPoints.UpVoteThread({ thread_id: thread?.id })).data.data;
    const downvote = async (thread: ThreadModel) => (await endPoints.DownVoteThread({ thread_id: thread?.id })).data.data;

    const onLikeHandler = () => {
        dispatch(asyncLikeThreadDetail(() => upvote(thread), thread) as any);
    };

    const onDisLikeHandler = () => {
        dispatch(asyncDisLikeThreadDetail(() => downvote(thread), thread) as any);
    };

    return (
        <div className="pb-32">
            <LoadingBar style={{ background: "#1DA1F2", zIndex: "20" }} scope={GET_THREAD_DETAIL} />
            <Header>
                <div className="w-full flex items-center gap-9">
                    <ButtonBack title="Back" onClick={backHandler} />
                    <p className="font-semibold m-0 leading-5">Threads</p>
                </div>
            </Header>
            <div className="w-full flex flex-col px-4 pt-4 border-bottom">
                <ThreadHeader
                    isLoading={isLoading}
                    user={thread?.owner}
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
                <span className="font-normal text-gray-400 my-2">{dayjs(thread?.createdAt).format("HH:mm . MMM D, YYYY")}</span>
                <ThreadAction
                    thread={thread}
                    onLikeHandler={onLikeHandler}
                    onDisLikeHandler={onDisLikeHandler}
                    className="!w-full !justify-around border-bottom border-top py-2"
                />
            </div>
            {thread?.comments?.map((comment) => (
                <Comment thread={thread} comment={comment} key={comment.id} />
            ))}
        </div>
    );
}

export default Thread;
