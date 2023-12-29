describe("Encryption Tests", () => {
  it("successfully loads and encrypts a file", () => {
    cy.visit("http://localhost:3000");
    cy.get('input[type="file"]').attachFile("example.txt");
    cy.get('input[type="text"]').type("StrongPassword123!");
    cy.get("button").contains("Encrypt File").click();
  });
});
