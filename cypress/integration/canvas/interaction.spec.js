/// <reference types="cypress" />

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

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

  it("button is clicked", () => {
    cy.wait(1000);
    cy.get("canvas").click(684, 446);

    cy.get("canvas").then((c) => {
      const gl = c[0].getContext("webgl2");
      const pixel = new Uint8Array(4);
      gl.readPixels(
        748.91015625,
        428.19140625,
        1,
        1,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        pixel
      );
      const hexColor = rgbToHex(pixel[0], pixel[1], pixel[2]);
      cy.log(hexColor);
      // takes color from the edge. If its dark, button is pressed
      cy.wrap({ hexColor }).its("hexColor").should("eq", "#11133a");
    });
  });
});
