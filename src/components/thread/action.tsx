import CommentModal, { CommentModalChildren } from "components/modals/comment";
import { Thread } from "models";
import React from "react";
import { BiComment, BiDislike, BiLike } from "react-icons/bi";
import { AiTwotoneLike, AiTwotoneDislike } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { ReducerType } from "states";
import { asyncCreateComment } from "states/comments/action";
import ActionButton from "./action-button";
import AuthModal, { AuthModalChildren } from "components/modals/auth";
import endPoints from "service/end-points";

export type Props = React.HTMLAttributes<HTMLDivElement> & {
    thread?: Thread;
    upVotesBy?: string[];
    downVotesBy?: string[];
    like?: boolean;
    dislike?: boolean;
    comment?: boolean;
    onLikeHandler?: () => void;
    onDisLikeHandler?: () => void;
};

function ThreadAction({
    thread,
    className,
    upVotesBy = [],
    downVotesBy = [],
    like = true,
    dislike = true,
    comment = true,
    onLikeHandler = () => {},
    onDisLikeHandler = () => {},
    ...rest
}: Props) {
    const state = useSelector<ReducerType, ReducerType>((state) => state);
    const dispatch = useDispatch();
    const myId = state.user?.id;

    const upVoteTotal = thread?.upVotesBy?.length || upVotesBy.length || 0;
    const downVoteTotal = thread?.downVotesBy?.length || downVotesBy.length || 0;

    const alreadyLike = upVotesBy?.find((id) => myId === id) || thread?.upVotesBy?.find((id) => myId === id);
    const alreadyDisLike = downVotesBy?.find((id) => myId === id) || thread?.downVotesBy?.find((id) => myId === id);

    const createComment = async (threadId: any, content: string) => (await endPoints.CreateComment({ thread_id: threadId, content })).data.data;

    const onSubmitComment = (content: string, callback: () => void) => {
        dispatch(asyncCreateComment({ caller: () => createComment(thread?.id, content), threadId: thread?.id, content, callback }) as any);
    };

    const onClickComment = (commentModal: CommentModalChildren, authModal: AuthModalChildren) => {
        return () => {
            if (!state?.user?.id) {
                authModal.openWithContentHandler("comment");
                return;
            }
            commentModal.openHandler();
        };
    };

    const onClickLike = (auth: AuthModalChildren) => {
        return () => {
            if (!state?.user?.id) {
                auth.openWithContentHandler("like");
                return;
            }
            onLikeHandler();
        };
    };

    const onClickDisLike = (auth: AuthModalChildren) => {
        return () => {
            if (!state?.user?.id) {
                auth.openWithContentHandler("dislike");
                return;
            }
            onDisLikeHandler();
        };
    };

    return (
        <AuthModal>
            {(auth) => (
                <div className={`w-[300px] flex items-center justify-between mt-2 ${className}`} {...rest}>
                    {like && (
                        <ActionButton
                            variantActive={alreadyLike ? "like" : "comment"}
                            variant="like"
                            total={upVoteTotal}
                            Icon={alreadyLike ? AiTwotoneLike : BiLike}
                            onClick={onClickLike(auth)}
                        />
                    )}
                    {dislike && (
                        <ActionButton
                            variant="dislike"
                            variantActive={alreadyDisLike ? "dislike" : "comment"}
                            total={downVoteTotal}
                            Icon={alreadyDisLike ? AiTwotoneDislike : BiDislike}
                            onClick={onClickDisLike(auth)}
                        />
                    )}
                    {comment && (
                        <CommentModal thread={thread} onSubmitHandler={onSubmitComment}>
                            {(comment) => (
                                <ActionButton
                                    variant="comment"
                                    total={thread?.totalComments || thread?.comments?.length}
                                    Icon={BiComment}
                                    onClick={onClickComment(comment, auth)}
                                />
                            )}
                        </CommentModal>
                    )}
                </div>
            )}
        </AuthModal>
    );
}

export default ThreadAction;
