describe("Decryption Test", () => {
  it("successfully switches to decryption mode, decrypts a file, and downloads the decrypted file", () => {
    cy.visit("http://localhost:3000");
    cy.get(".decryption-toggle").click();

    cy.get('input[type="file"]').attachFile("example.txt.ss");

    cy.get('input[type="password"]').type("StrongPassword123!");

    cy.get("button").contains("Decrypt File").click();
  });
});
