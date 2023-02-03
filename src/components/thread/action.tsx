import CommentModal from "components/modals/comment";
import { Thread } from "models";
import React from "react";
import { BiLike, BiDislike, BiComment } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { ReducerType } from "states";
import { asyncCreateComment } from "states/comments/action";
import { asyncDisLikeThread, asyncLikeThread } from "states/votes/action";
import ActionButton from "./action-button";

export type Props = React.HTMLAttributes<HTMLDivElement> & {
    thread?: Thread;
    like?: boolean;
    dislike?: boolean;
    comment?: boolean;
};

function ThreadAction({ thread, className, like = true, dislike = true, comment = true, ...rest }: Props) {
    const state = useSelector<ReducerType, ReducerType>((state) => state);
    const dispatch = useDispatch();
    const myId = state.user?.id;

    const onLikeHandler = () => {
        dispatch(asyncLikeThread(thread) as any);
    };

    const onDisLikeHandler = () => {
        dispatch(asyncDisLikeThread(thread) as any);
    };

    const upVoteTotal = thread?.upVotesBy?.length || 0;
    const downVoteTotal = thread?.downVotesBy?.length || 0;

    const commentHandler = (comments: string, callback: () => void) => {
        dispatch(asyncCreateComment(thread?.id, comments, callback) as any);
    };

    return (
        <div className={`w-[300px] flex items-center justify-between mt-2 ${className}`} {...rest}>
            {like && <ActionButton variant="like" total={upVoteTotal} Icon={BiLike} onClick={onLikeHandler} />}
            {dislike && <ActionButton variant="dislike" total={downVoteTotal} Icon={BiDislike} onClick={onDisLikeHandler} />}
            {comment && (
                <CommentModal thread={thread} onSubmitHandler={commentHandler}>
                    {(comment) => <ActionButton variant="comment" total={thread?.totalComments} Icon={BiComment} onClick={comment.openHandler} />}
                </CommentModal>
            )}
        </div>
    );
}

export default ThreadAction;
