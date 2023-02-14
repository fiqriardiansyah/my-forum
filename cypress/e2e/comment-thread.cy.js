/**
 * - Comment Thread spec
 *      - should be able to create comment and show the comment in thread
 */

describe("Comment Thread spec", () => {
    beforeEach(() => {
        cy.viewport("macbook-15");
        cy.visit("http://localhost:5173/auth/sign-in");
    });

    it("should be able to create comment and show the comment in thread", () => {
        cy.get(`input[placeholder="Email"]`).type("fiqri@gmail.com");
        cy.get(`input[placeholder="Password"]`).type("12345678");
        cy.get("#login-btn").should("be.visible").click();

        cy.contains("div", "Home");
        cy.contains("div", "Explore");
        cy.contains("div", "Leaderboards");
        cy.contains("div", "Profile");
        cy.contains("div", "fiqri@gmail.com");

        const date = new Date().getTime();

        cy.get(`button[id="comment-button"]`).first().should("be.visible").click();

        cy.get(`div[placeholder="Speak your reply"]`).should("be.visible").type(date);

        cy.get(`button[title="reply-button"]`).should("be.visible").click();

        cy.get(".thread-header").first().should("be.visible").click();

        cy.contains("div", date);
    });
});
