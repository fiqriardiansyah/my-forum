import { showLoading, hideLoading } from "react-redux-loading-bar";
import endPoints from "service/end-points";
import { successComment, failComment, asyncGetDetailThread } from "states/threads/action";

export default {};
export const ActionType = {
    CREATE_COMMENT: "CREATE_COMMENT",
};

export const MODAL_COMMENT = "MODAL_COMMENT";

export const createComment = () => ({
    type: ActionType.CREATE_COMMENT,
});

export const asyncCreateComment = (threadId: any, content: string, callback: () => void) => async (dispatch: any) => {
    dispatch(showLoading(MODAL_COMMENT));
    dispatch(createComment());
    dispatch(successComment(threadId, content));
    try {
        await endPoints.CreateComment({ thread_id: threadId, content });
        dispatch(asyncGetDetailThread(threadId));
    } catch (e) {
        dispatch(failComment(threadId, content));
    }
    callback();
    dispatch(hideLoading(MODAL_COMMENT));
};
