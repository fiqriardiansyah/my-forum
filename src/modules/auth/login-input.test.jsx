import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import LoginInput from "./login-input";
import { BrowserRouter, Route, Routes } from "react-router-dom";

/**
 * - login input component
 *      - should call onsubmit function when user click button login
 */

describe("login input component", () => {
    it("should call onsubmit function when user click button login", async () => {
        const onSubmit = vi.fn();
        render(
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LoginInput onSubmit={onSubmit} />} />
                </Routes>
            </BrowserRouter>
        );

        const emailInput = screen.getByPlaceholderText("Email");
        await userEvent.type(emailInput, "fiqri@gmail.com");
        const passwordInput = screen.getByPlaceholderText("Password");
        await userEvent.type(passwordInput, "12345678");
        const loginButton = screen.getByText("Login");

        await userEvent.click(loginButton);

        expect(onSubmit).toBeCalledWith({
            email: "fiqri@gmail.com",
            password: "12345678",
        });
    });
});
