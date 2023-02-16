import { hideLoading, showLoading } from "react-redux-loading-bar";
import { failComment, successComment } from "states/threads/action";

export default {};
export const ActionType = {
    CREATE_COMMENT: "CREATE_COMMENT",
};

export const MODAL_COMMENT = "MODAL_COMMENT";

export const createComment = () => ({
    type: ActionType.CREATE_COMMENT,
});

export const asyncCreateComment =
    ({ caller, threadId, content, callback }: { caller: () => Promise<any>; threadId: any; content: string; callback: () => void }) =>
    async (dispatch: any) => {
        // dispatch(showLoading(MODAL_COMMENT));
        dispatch(createComment());
        dispatch(successComment(threadId, content));
        try {
            await caller();
        } catch (e) {
            dispatch(failComment(threadId, content));
        }
        callback();
        dispatch(hideLoading(MODAL_COMMENT));
    };
