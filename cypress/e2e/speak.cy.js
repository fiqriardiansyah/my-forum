/**
 * - Speak spec
 *   - should display login page correctly
 *   - should login before create thread (speak)
 */

describe("speak spec", () => {
    beforeEach(() => {
        cy.viewport("macbook-15");
        cy.visit("http://localhost:5173/auth/sign-in");
    });

    it("should display login page correctly", () => {
        cy.get(`input[placeholder="Email"]`).should("be.visible");
        cy.get(`input[placeholder="Password"]`).should("be.visible");
        cy.get("#login-btn").should("be.visible");
    });

    it("should login before create thread (speak)", () => {
        const title = "hello world 👋";
        const body = "javascript is the best programming lang, change my mind ☕";
        const category = "cypress";

        cy.get(`input[placeholder="Email"]`).should("be.visible").type("fiqri@gmail.com");
        cy.get(`input[placeholder="Password"]`).should("be.visible").type(12345678);
        cy.get("#login-btn").should("be.visible").click();

        cy.then(() => {
            cy.contains("div", "Home");
            cy.contains("div", "Leaderboards");
            cy.contains("div", "Explore");
            cy.contains("div", "Profile");
            cy.contains("div", "fiqri@gmail.com");
        });

        cy.get(`input[placeholder="Title"]`).should("be.visible").type(title);
        cy.get(`div[placeholder="What's happening?"]`).should("be.visible").type(body);
        cy.get(`input[placeholder="Hastag"]`).should("be.visible").type(category);

        cy.get(`button[title="speak"]`).should("be.visible").click();

        cy.then(() => {
            cy.contains("div", title);
            cy.contains("div", body);
            cy.contains("div", category);
        });
    });
});
