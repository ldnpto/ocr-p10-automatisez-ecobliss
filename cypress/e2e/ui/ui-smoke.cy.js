let uiHomeUrl = Cypress.env("frontBaseUrl")
let uiProductsUrl = Cypress.env("frontBaseUrl") + "/products"

describe('mandatory fields', () => {
    it('should exist login, password fields and submit button on login page', () => {
        cy.visit(uiHomeUrl + '/login')
        cy.get('[data-cy="login-input-username"]').should('exist')
        cy.get('[data-cy="login-input-password"]').should('exist')
        cy.get('[data-cy="login-submit"]').should('exist')
    })


    it('should exist add to cart button when logged in', () => {
        cy.ui_login_ok()
        cy.reload()
        let productLinks = [];
        let productNumber = 7;
        cy.visit(uiProductsUrl)
        cy.get('[data-cy="product"]').first(($product) => {         
            cy.wrap($product).find('[data-cy="product-link"]').should('exist').invoke('attr', 'ng-reflect-router-link').then((link) => { 
                productNumber = link.split(',')[1]
            });          
            cy.visit(uiProductsUrl + "/" + productNumber)
            cy.url().should('include', '/' + productNumber)
            cy.get('[data-cy="detail-product-add"]').should('exist')       
            cy.get('[data-cy="detail-product-stock"]').invoke('text').should('not.be.empty')        
        })      
      
    })
})

