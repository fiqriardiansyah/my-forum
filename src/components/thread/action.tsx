import { Thread } from "models";
import { BiLike, BiDislike, BiComment } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { ReducerType } from "states";
import { asyncDisLikeThread, asyncLikeThread } from "states/votes/action";
import ActionButton from "./action-button";

export type Props = {
    thread: Thread;
};

function ThreadAction({ thread }: Props) {
    const state = useSelector<ReducerType, ReducerType>((state) => state);
    const dispatch = useDispatch();
    // const myId = state.user?.id;

    // const upVoteLocal = state?.voute?.threads.find((th) => th.id === thread.id)?.voute === "up" ? 1 : 0;
    // const downVoteLocal = state?.voute?.threads.find((th) => th.id === thread.id)?.voute === "down" ? 1 : 0;

    const onLikeHandler = () => {
        dispatch(asyncLikeThread(thread) as any);
    };

    const onDisLikeHandler = () => {
        dispatch(asyncDisLikeThread(thread) as any);
    };

    const onCommentHandler = () => {
        console.log("comment");
    };

    const upVoteTotal = thread?.upVotesBy?.length || 0;
    const downVoteTotal = thread?.downVotesBy?.length || 0;

    return (
        <div className="w-[300px] flex items-center justify-between mt-2">
            <ActionButton variant="like" total={upVoteTotal} Icon={BiLike} onClick={onLikeHandler} />
            <ActionButton variant="dislike" total={downVoteTotal} Icon={BiDislike} onClick={onDisLikeHandler} />
            <ActionButton variant="comment" total={thread?.totalComments} Icon={BiComment} onClick={onCommentHandler} />
        </div>
    );
}

export default ThreadAction;
