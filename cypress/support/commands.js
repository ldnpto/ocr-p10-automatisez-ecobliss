// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

const envApiBaseUrl = Cypress.env("apiBaseUrl");
const envUIBaseUrl = Cypress.env("frontBaseUrl");
const envUsername = Cypress.env("username");
const envPassword = Cypress.env("password");

Cypress.Commands.add('api_login', (username, password) => {    
    cy.request({
        failOnStatusCode: false,
        method: "POST",
        url: envApiBaseUrl + "/login",
        body: {
        username: username,
        password: password
        }
    }).then((response) => {        
        return response    
    })
})

Cypress.Commands.add('api_login_ok', () => {    
    var authToken;
    return cy.api_login (envUsername, envPassword).then((response) => {
        authToken = response.body.token
        expect(authToken).to.not.be.empty                
    })    
})

Cypress.Commands.add('ui_login', (username, password) => {    
    cy.visit(envUIBaseUrl + "/login")    
    cy.get('[data-cy="login-input-username"]').type(username)
    cy.get('[data-cy="login-input-password"]').type(password)
    cy.get('[data-cy="login-submit"]').click()    
})

Cypress.Commands.add('ui_login_ok', () => {
    cy.ui_login(envUsername, envPassword)
    cy.get('[data-cy="nav-link-logout"]').should('exist')
})