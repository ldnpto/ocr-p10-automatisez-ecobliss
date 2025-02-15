context("POST /login", () => {
  it("should login with correct user and password", () => {
    cy.api_login_ok()
  })
  it("should not login with invalid mail format and password", () => {
    cy.api_login("test", "test").then((response) => {
      expect(response.status).to.eq(401)
    });
  })
  it("should not login with unknown user", () => {
    cy.api_login("mymail@gmail.com", "mytest").then((response) => {
      expect(response.status).to.eq(401)
    });
  })

  it("should not login with no login and password", () => {
    cy.api_login("", "").then((response) => {
      expect(response.status).to.eq(401)
    });
  })
})