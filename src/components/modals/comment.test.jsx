import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { vi } from "vitest";
import store from "../../states/index";
import CommentModal from "./comment";

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

describe("modal comment", () => {
    it("should call onsubmithandler when reply click", async () => {
        const onSubmitHandler = vi.fn();

        const children = (comment) => (
            <div>
                <button onClick={comment.openHandler}>open modal</button>
            </div>
        );

        render(
            <ReduxProvider store={store}>
                <BrowserRouter>
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <CommentModal thread={thread} onSubmitHandler={onSubmitHandler}>
                                    {children}
                                </CommentModal>
                            }
                        />
                    </Routes>
                </BrowserRouter>
            </ReduxProvider>
        );

        const openModalButton = screen.getByText("open modal");
        await userEvent.click(openModalButton);

        screen.getByText(thread.title);
        const inputComment = screen.getByPlaceholderText("Speak your reply");
        await userEvent.type(inputComment, "this is content comment");

        const replyButton = screen.getByTitle("reply-button");
        await userEvent.click(replyButton);

        expect(onSubmitHandler).toBeCalled();
    });
});
