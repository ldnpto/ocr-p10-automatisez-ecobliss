
describe('user login', () => {
  it('should login user from correct login and password', () => {
    cy.ui_login_ok()
    cy.get('[data-cy="nav-link-logout"]').should('exist')
  })

  it('should logout user', () => {
    cy.ui_login_ok()
    cy.get('[data-cy="nav-link-logout"]').click()
    cy.get('[data-cy="nav-link-logout"]').should('not.exist')
  })


  it('should not login user from incorrect mail format', () => {
    cy.ui_login("test", "test")
    cy.get('[data-cy="nav-link-logout"]').should('not.exist')
  })

  it('should not login user from unknown user', () => {
    cy.ui_login("test@test.com", "test")
    cy.get('[data-cy="nav-link-logout"]').should('not.exist')
  })

})

