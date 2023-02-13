import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import RegisterInput from "./register-input";
import { BrowserRouter, Route, Routes } from "react-router-dom";

describe("register input component", () => {
    it("should call onsubmit function when user click button register", async () => {
        const onSubmit = vi.fn();
        render(
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<RegisterInput onSubmit={onSubmit} />} />
                </Routes>
            </BrowserRouter>
        );

        const nameInput = screen.getByPlaceholderText("Name");
        await userEvent.type(nameInput, "fiqri");
        const emailInput = screen.getByPlaceholderText("Email");
        await userEvent.type(emailInput, "fiqri@gmail.com");
        const passwordInput = screen.getByPlaceholderText("Password");
        await userEvent.type(passwordInput, "12345678");
        const loginButton = screen.getByText("Register");

        await userEvent.click(loginButton);

        expect(onSubmit).toBeCalledWith({
            name: "fiqri",
            email: "fiqri@gmail.com",
            password: "12345678",
        });
    });
});
