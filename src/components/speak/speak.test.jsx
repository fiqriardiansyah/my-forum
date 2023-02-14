import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider as ReduxProvider } from "react-redux";
import { vi } from "vitest";
import store from "../../states/index";
import Speak from "./index";

const newThread = {
    title: "hello world",
    body: "hy this is body of thread",
    category: "testing",
};

/**
 * - speak component
 *      - should return create thread data when click button speak
 */

describe("speak component", () => {
    it("should return create thread data when click button speak", async () => {
        const onSpeakHandler = vi.fn();

        const { getByPlaceholderText, getByTitle } = render(
            <ReduxProvider store={store}>
                <Speak onSpeakHandler={onSpeakHandler} />
            </ReduxProvider>
        );

        const inputTitle = getByPlaceholderText("Title");
        const inputBody = getByPlaceholderText("What's happening?");
        const inputCategory = getByPlaceholderText("Hastag");

        await userEvent.type(inputTitle, newThread.title);
        await userEvent.type(inputBody, newThread.body);
        await userEvent.type(inputCategory, newThread.category);

        const buttonSpeak = getByTitle("speak");
        await userEvent.click(buttonSpeak);

        expect(onSpeakHandler).toBeCalledWith(newThread);
    });
});
