/// <reference types="cypress" />

describe("example to-do app", () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit("localhost:8080");
  });

  it("should create canvas", () => {
    cy.get("canvas").should("have.length", 1);
    cy.log(cy.get("canvas"));
  });

  it("should spin", () => {
    cy.wait(1000);
    cy.get("canvas").click(684, 446);
  });
});
