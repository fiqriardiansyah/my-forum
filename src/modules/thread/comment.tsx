import ThreadAction from "components/thread/action";
import ThreadHeader from "components/thread/header";
import htmlParser from "html-react-parser";
import { Comment as CommentType, Thread } from "models";
import { useDispatch } from "react-redux";
import endPoints from "service/end-points";
import { asyncDisLikeComment, asyncLikeComment } from "states/votes/action";

type Props = {
    comment?: CommentType;
    thread?: Thread;
};

function Comment({ comment, thread }: Props) {
    const dispatch = useDispatch();

    const upvote = async () => {
        return (await endPoints.UpVoteComment({ thread_id: thread?.id, comment_id: comment?.id })).data.data;
    };

    const downvote = async () => (await endPoints.DownVoteComment({ thread_id: thread?.id, comment_id: comment?.id })).data.data;

    const onLikeHandler = () => {
        dispatch(asyncLikeComment(upvote, comment) as any);
    };

    const onDisLikeHandler = () => {
        dispatch(asyncDisLikeComment(downvote, comment) as any);
    };

    return (
        <>
            <ThreadHeader
                time={comment?.createdAt}
                user={comment?.owner}
                description={
                    <div className="font-light text-gray-600 overflow-x-auto break-words">
                        <p className="m-0 text-gray-400 mb-2">
                            Replying to <span className="text-primary">@{thread?.owner?.name}</span>
                        </p>
                        {htmlParser(comment?.content || "")}
                    </div>
                }
                className="px-4 pt-4"
            />
            <ThreadAction
                upVotesBy={comment?.upVotesBy}
                downVotesBy={comment?.downVotesBy}
                onLikeHandler={onLikeHandler}
                onDisLikeHandler={onDisLikeHandler}
                comment={false}
                className="!w-full !justify-around border-bottom pb-1"
            />
        </>
    );
}

export default Comment;
