/**
 * - Login spec
 *   - should display login page correctly
 *   - should display alert when email is empty
 *   - should display alert when password is empty
 *   - should display alert when email not valid
 *   - should display alert when wrong password
 *   - should display homepage when email and password are correct
 *   - should be able to logout
 */

describe("login spec", () => {
    beforeEach(() => {
        cy.viewport("macbook-15");
        cy.visit("http://localhost:5173/auth/sign-in");
    });

    it("should display login page correctly", () => {
        cy.get(`input[placeholder="Email"]`).should("be.visible");
        cy.get(`input[placeholder="Password"]`).should("be.visible");
        cy.get("#login-btn").should("be.visible");
    });

    it("should display alert when email is empty", () => {
        cy.get(`input[placeholder="Email"]`).should("be.visible");
        cy.get("#login-btn").should("be.visible").click();

        cy.contains("div", "Please input your email!");
    });

    it("should display alert when password is empty", () => {
        cy.get(`input[placeholder="Password"]`).should("be.visible");
        cy.get("#login-btn").should("be.visible").click();

        cy.contains("div", "Please input your password!");
    });

    it("should display alert when email not valid", () => {
        cy.get(`input[placeholder="Email"]`).type("testuser");
        cy.get(`input[placeholder="Password"]`).type("wrong_password");
        cy.get("#login-btn").should("be.visible").click();

        cy.then(() => {
            cy.contains("div", `"email" must be a valid email`);
        });
    });

    it("should display alert when wrong password", () => {
        cy.get(`input[placeholder="Email"]`).type("fiqri@gmail.com");
        cy.get(`input[placeholder="Password"]`).type("wrong_password");
        cy.get("#login-btn").should("be.visible").click();

        cy.then(() => {
            cy.contains("div", `email or password is wrong`);
        });
    });

    it("should display homepage when email and password are correct", () => {
        cy.get(`input[placeholder="Email"]`).type("fiqri@gmail.com");
        cy.get(`input[placeholder="Password"]`).type("12345678");
        cy.get("#login-btn").should("be.visible").click();

        cy.contains("div", "Home");
        cy.contains("div", "Explore");
        cy.contains("div", "Leaderboards");
        cy.contains("div", "Profile");
        cy.contains("div", "fiqri@gmail.com");
    });

    it("should be able to logout", () => {
        cy.get(`input[placeholder="Email"]`).type("fiqri@gmail.com");
        cy.get(`input[placeholder="Password"]`).type("12345678");
        cy.get("#login-btn").should("be.visible").click();

        cy.get("button#profile-button").should("be.visible").click();
        cy.get("button#logout-button").should("be.visible").click();
        cy.then(() => {
            cy.contains("div", "Profile").should("not.exist");
        });
    });
});
