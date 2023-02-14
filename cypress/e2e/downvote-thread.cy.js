/**
 * - Downvote Thread spec
 *      - should update downvote total when not downvote yet
 */

describe("Downvote Thread spec", () => {
    beforeEach(() => {
        cy.viewport("macbook-15");
        cy.visit("http://localhost:5173/auth/sign-in");
    });
    it("should update downvote total when not downvote yet", async () => {
        cy.get(`input[placeholder="Email"]`).type("fiqri@gmail.com");
        cy.get(`input[placeholder="Password"]`).type("12345678");
        cy.get("#login-btn").should("be.visible").click();

        cy.contains("div", "Home");
        cy.contains("div", "Explore");
        cy.contains("div", "Leaderboards");
        cy.contains("div", "Profile");
        cy.contains("div", "fiqri@gmail.com");

        const buttonDislike = cy.get(`button[id="dislike-button"]`).first().should("be.visible");

        cy.get(`button[id="dislike-button"] .total`)
            .first()
            .should("be.visible")
            .then((spanTotal) => {
                const totalDislike = spanTotal.text();

                cy.get(`button[id="dislike-button"]`)
                    .first()
                    .invoke("attr", "class")
                    .then((classList) => {
                        // if not downvote yet
                        if (!classList.includes("active")) {
                            buttonDislike.click();
                            cy.then(() => {
                                cy.get(`button[id="dislike-button"] .total`)
                                    .first()
                                    .should("be.visible")
                                    .then((st) => {
                                        const currentTotalDislike = st.text();
                                        expect(Number(currentTotalDislike)).to.equal(Number(totalDislike) + 1);
                                    });
                            });
                        }
                    });
            });
    });
});
