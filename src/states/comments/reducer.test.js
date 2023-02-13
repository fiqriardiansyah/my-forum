import axios from "axios";
import { hideLoading, showLoading } from "react-redux-loading-bar";
import { failComment, successComment } from "../threads/action";
import { asyncCreateComment, createComment, MODAL_COMMENT } from "./action";
import commentsReducer from "./reducer";

const thread = {
    id: "thread-1",
    title: "Thread Pertama",
    body: "Ini adalah thread pertama",
    category: "General",
    createdAt: "2021-06-21T07:00:00.000Z",
    ownerId: "users-1",
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0,
};

const comment = {
    id: "comment-1",
    content: "Ini adalah komentar pertama",
    createdAt: "2021-06-21T07:00:00.000Z",
    owner: {
        id: "users-1",
        name: "John Doe",
        avatar: "https://generated-image-url.jpg",
    },
    upVotesBy: [],
    downVotesBy: [],
};

describe("commentsReducer function", () => {
    it("should return the initial state when given by unknown action", () => {
        const initialState = {};
        const action = { type: "UNKNOWN" };

        const nextState = commentsReducer(initialState, action);

        expect(nextState).toEqual(initialState);
    });

    it("should dispatch action correctly when create comment success", async () => {
        const dispatch = vi.fn();
        const callback = vi.fn();

        await asyncCreateComment({ caller: axios.get.mockResolvedValueOnce({}), threadId: thread.id, content: comment.content, callback })(dispatch);

        expect(dispatch).toHaveBeenCalledWith(showLoading(MODAL_COMMENT));
        expect(dispatch).toHaveBeenCalledWith(createComment());
        expect(dispatch).toHaveBeenCalledWith(successComment(thread.id, comment.content));
        expect(dispatch).toHaveBeenCalledWith(hideLoading(MODAL_COMMENT));
        expect(callback).toHaveBeenCalled();
    });

    it("should dispatch action correctly when create comment fail", async () => {
        const dispatch = vi.fn();
        const callback = vi.fn();

        await asyncCreateComment({ caller: axios.get.mockRejectedValueOnce({}), threadId: thread.id, content: comment.content, callback })(dispatch);

        expect(dispatch).toHaveBeenCalledWith(showLoading(MODAL_COMMENT));
        expect(dispatch).toHaveBeenCalledWith(createComment());
        expect(dispatch).toHaveBeenCalledWith(successComment(thread.id, comment.content));
        expect(dispatch).toHaveBeenCalledWith(failComment(thread.id, comment.content));
        expect(dispatch).toHaveBeenCalledWith(hideLoading(MODAL_COMMENT));
        expect(callback).toHaveBeenCalled();
    });
});
