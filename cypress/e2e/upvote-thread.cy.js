/**
 * - Upvote Thread spec
 *      - should update upvote total when not upvote yet
 */

describe("Upvote Thread spec", () => {
    beforeEach(() => {
        cy.viewport("macbook-15");
        cy.visit("http://localhost:5173/auth/sign-in");
    });

    it("should update upvote total when not upvote yet", async () => {
        cy.get(`input[placeholder="Email"]`).type("fiqri@gmail.com");
        cy.get(`input[placeholder="Password"]`).type("12345678");
        cy.get("#login-btn").should("be.visible").click();

        cy.contains("div", "Home");
        cy.contains("div", "Explore");
        cy.contains("div", "Leaderboards");
        cy.contains("div", "Profile");
        cy.contains("div", "fiqri@gmail.com");

        const buttonLike = cy.get(`button[id="like-button"]`).first().should("be.visible");

        cy.get(`button[id="like-button"] .total`)
            .first()
            .should("be.visible")
            .then((spanTotal) => {
                const totalLike = spanTotal.text();

                cy.get(`button[id="like-button"]`)
                    .first()
                    .invoke("attr", "class")
                    .then((classList) => {
                        // if not upvote yet
                        if (!classList.includes("active")) {
                            buttonLike.click();
                            cy.then(() => {
                                cy.get(`button[id="like-button"] .total`)
                                    .first()
                                    .should("be.visible")
                                    .then((st) => {
                                        const currentTotalLike = st.text();
                                        expect(Number(currentTotalLike)).to.equal(Number(totalLike) + 1);
                                    });
                            });
                        }
                    });
            });

        // logout
        cy.get("button#profile-button").should("be.visible").click();
        cy.get("button#logout-button").should("be.visible").click();
        cy.then(() => {
            cy.contains("div", "Profile").should("not.exist");
        });
    });
});
