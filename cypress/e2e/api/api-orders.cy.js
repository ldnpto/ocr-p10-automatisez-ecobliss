
var auth_token = null;
const apiOrdersUrl = Cypress.env("apiBaseUrl") + "/orders";
const apiProductsUrl = Cypress.env("apiBaseUrl") + "/products";

before(() => {
  cy.api_login_ok().then((response) => {
    auth_token = response.body.token;
  })    
})

context("verify status code of orders call from unauthorized and authorized user", () => {


  it("should return 401 if the user is not connected", () => {
    
    cy.request({
      failOnStatusCode: false,
      method: "GET",
      url: apiOrdersUrl      
    }).then((response) => {
      expect(response.status).to.eq(401)      
    })
  })

  it("should return 401 for unathorized user trying to get a list of orders", () => {
    
    cy.request({
      failOnStatusCode: false,
      method: "GET",
      url: apiOrdersUrl,
      headers: {
        Authorization: `Bearer test`
      }
    }).then((response) => {
      expect(response.status).to.eq(401)      
    })
  })

  it("should get a list of orders with an authorized token", () => {
    
    cy.request({
      method: "GET",
      url: apiOrdersUrl,
      headers: {
        Authorization: `Bearer ${auth_token}`
      }
    }).then((response) => {      
      expect(response.status).to.eq(200)
      expect(response.body).exist
    })
   
  })


  
  context ("should add a product in the cart, change quantity and remove it", () => {    

      var productId = null;
      var cartId = null;

      it ("should return a random product", () => {
        cy.request({
          method: "GET",
          url: apiProductsUrl,
          headers: {
            Authorization: `Bearer ${auth_token}`
          }
        }).then((response) => {      
          expect(response.status).to.eq(200)
          productId = response.body[Math.floor(Math.random() * response.body.length )].id          
        })
      })

      it ("should allow POST method on product to add to the cart", () => {
        cy.request({
          failOnStatusCode: false,
          method: "POST",
          url: apiOrdersUrl + "/add",
          headers: {
            Authorization: `Bearer ${auth_token}`
          },
          body: {
            "product" : productId,
            "quantity" : 1
          }
        }).then((response) => {      
          expect(response.status).to.eq(200)   // retournera 405 (car POST ne semble pas fonctionner au contraire de PUT)
        })
      })

      it ('should not add an out of stock product in the cart', () => {
        cy.request({
          failOnStatusCode: false,
          method: "POST",
          url: apiOrdersUrl + "/add",
          headers: {
            Authorization: `Bearer ${auth_token}`
          },
          body: {
            product : 3,
            quantity: 1
          }
        }).then((response) => {
          expect(response.status).to.eq(405)
        })
      })

      it ("should add an available product to the cart", () => {
        cy.log('Product ID:', productId)        
        cy.request({
          method: "PUT", // la méthode correcte devrait être POST
          url: apiOrdersUrl + "/add",
          headers: {
            Authorization: `Bearer ${auth_token}`
          },
          body: {
            "product" : productId,
            "quantity" : 1
          }
        }).then((response) => {      
          expect(response.status).to.eq(200) // devrait retourner 405, mais pour le test, nous laissons à 200
          cartId = response.body.orderLines[0].id
          cy.log('Cart ID:', cartId)          
        })
      })

      it('should changes the quantity of the product order', () => {
        cy.request({
            method: "PUT",  // la méthode correcte devrait être POST
            url: apiOrdersUrl + `/${cartId}/change-quantity`,
            headers: {
                Authorization : `Bearer ${auth_token}`
            },
            body: {
                'quantity' : 2
            }
        }).then((response) => {
            expect(response.status).to.eq(200) // devrait retourner 405, mais pour le test, nous laissons à 200
        })
      })

      it('should empty the cart', () => {
        cy.request({
            method: 'DELETE',
            url: apiOrdersUrl + `/${cartId}/delete`,
            headers: {
                Authorization : `Bearer ${auth_token}`
            }
        }).then((response) => {
            expect(response.status).to.be.eq(200)
        })
      })

  })

})