const { render, screen } = require("@testing-library/react");
import userEvent from "@testing-library/user-event";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthModal from "./auth";

/**
 * - modal auth
 *      - should show right content based on type (like, dislike, comment) when click
 */

describe("modal auth", () => {
    it("should show right content based on type (like, dislike, comment) when click", async () => {
        const children = (auth) => (
            <div>
                <button onClick={() => auth.openWithContentHandler("like")}>like</button>
                <button onClick={() => auth.openWithContentHandler("dislike")}>dislike</button>
                <button onClick={() => auth.openWithContentHandler("comment")}>comment</button>
            </div>
        );

        render(
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<AuthModal>{children}</AuthModal>} />
                </Routes>
            </BrowserRouter>
        );

        const likeButton = screen.getByText("like");
        await userEvent.click(likeButton);
        screen.getByText("Sukai sebuah Cuitan untuk menyebarkan cinta.");

        const dislikeButton = screen.getByText("dislike");
        await userEvent.click(dislikeButton);
        screen.getByText("Tidak Sukai sebuah Cuitan.");

        const commentButton = screen.getByText("comment");
        await userEvent.click(commentButton);
        screen.getByText("Balas untuk bergabung dengan percakapan.");
    });
});
