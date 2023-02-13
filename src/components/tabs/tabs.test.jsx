import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import Tabs from "./index";

describe("tabs component", () => {
    it("should render right when click tab", async () => {
        const onChangeActive = vi.fn((act) => {
            rerender(
                <Tabs
                    active={act}
                    onChangeActive={onChangeActive}
                    items={[
                        { key: "example", title: "Tab 1" },
                        { key: "example-2", title: "Tab 2" },
                    ]}
                />
            );
        });

        const { getByText, rerender } = render(
            <Tabs
                active="example"
                onChangeActive={onChangeActive}
                items={[
                    { key: "example", title: "Tab 1" },
                    { key: "example-2", title: "Tab 2" },
                ]}
            />
        );
        const buttonTab1 = getByText("Tab 1");
        const buttonTab2 = getByText("Tab 2");

        expect(screen.getByText("Tab 1")).toHaveClass("active");
        expect(screen.getByText("Tab 2")).not.toHaveClass("active");

        await userEvent.click(buttonTab2);

        expect(screen.getByText("Tab 1")).not.toHaveClass("active");
        expect(screen.getByText("Tab 2")).toHaveClass("active");

        await userEvent.click(buttonTab1);

        expect(screen.getByText("Tab 1")).toHaveClass("active");
        expect(screen.getByText("Tab 2")).not.toHaveClass("active");
    });
});
