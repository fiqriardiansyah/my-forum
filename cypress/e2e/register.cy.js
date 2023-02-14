/**
 * - Register spec
 *   - should display Register page correctly
 *   - should display alert when name, email, password is empty
 *   - should display alert when email not valid
 *   - should display success alert when user created
 */

describe("register spec", () => {
    beforeEach(() => {
        cy.viewport("macbook-15");
        cy.visit("http://localhost:5173/auth/sign-up");
    });

    it("should display register page correctly", () => {
        cy.get(`input[placeholder="Name"]`).should("be.visible");
        cy.get(`input[placeholder="Email"]`).should("be.visible");
        cy.get(`input[placeholder="Password"]`).should("be.visible");
        cy.get("#register-btn").should("be.visible");
    });

    it("should display alert when name, email, password is empty", () => {
        cy.get("#register-btn").should("be.visible").click();
        cy.contains("div", "Please input your name!");
        cy.contains("div", "Please input your email!");
        cy.contains("div", "Please input your password!");
    });

    it("should display alert when email not valid", () => {
        cy.get(`input[placeholder="Name"]`).should("be.visible").type("cypress");
        cy.get(`input[placeholder="Email"]`).should("be.visible").type("notemail");
        cy.get(`input[placeholder="Password"]`).should("be.visible").type("password");
        cy.get("#register-btn").should("be.visible").click();

        cy.then(() => {
            cy.contains("div", `"email" must be a valid email`);
        });
    });

    it("should display success alert when user created", () => {
        const random = new Date().getTime();

        cy.get(`input[placeholder="Name"]`)
            .should("be.visible")
            .type(random + "cypress");
        cy.get(`input[placeholder="Email"]`)
            .should("be.visible")
            .type(random + "cypress@gmail.com");
        cy.get(`input[placeholder="Password"]`).should("be.visible").type("password");
        cy.get("#register-btn").should("be.visible").click();

        cy.then(() => {
            cy.contains("div", `user created`);
        });
    });
});
