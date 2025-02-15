const uiHomeUrl =  Cypress.env("frontBaseUrl")
const uiProductsUrl = uiHomeUrl + "/products"
const apiOrdersUrl = Cypress.env("apiBaseUrl") + "/orders";
const uiCartUrl = uiHomeUrl + "/cart"


beforeEach(() => {
  cy.ui_login_ok()
  cy.visit(uiCartUrl)

  cy.get('body').then(($body) => {
    if ($body.find('[data-cy="cart-line-delete"]').length > 0) {
      cy.get('[data-cy="cart-line-delete"]').each(($deleteButton) => {
        cy.wrap($deleteButton).click()
      })
    }
  })
  
})

afterEach(() => {
    // empty cart
    cy.visit(uiCartUrl)

    cy.get('body').then(($body) => {
      if ($body.find('[data-cy="cart-line-delete"]').length > 0) {
        cy.get('[data-cy="cart-line-delete"]').each(($deleteButton) => {
          cy.wrap($deleteButton).click()
        })
      }
    })
})
  

describe('should add a product in stock, and update stock', () => {
  let productLinks = []
  let productId = 0
  let productStock = 0
  let productName = ""

  it ('should find an available product', () => {
    // select a random product
    cy.visit(uiProductsUrl)
    cy.url().should('include', '/products')
    cy.get('[data-cy="product"]').each(($product) => {
      cy.wrap($product).find('[data-cy="product-link"]').invoke('attr', 'ng-reflect-router-link').then((link) => {
        productLinks.push(link);
          
      });
    }).then(() => {      
      let stock = -1      
      // loop through productLinks and select a product where available quantity is greater than 0
      const checkProductStock = (index) => {
        if (index >= productLinks.length) {
          throw new Error("No product with stock found");
        }
        let link = productLinks[index];
        let linkProductId = link.split(',')[1];
        cy.visit(uiProductsUrl + "/" + linkProductId);
        cy.url().should('include', '/' + linkProductId);
        cy.reload();
        cy.get('[data-cy="detail-product-stock"]').invoke('text')
          .should('match', /(0|[1-9][0-9]*) en stock$/)
          .then((text) => {
            stock = parseInt(text.match(/^-?\d+/)[0]);
            if (stock > 0) {
              productId = linkProductId;
              productStock = stock;
              cy.get('[data-cy="detail-product-name"]').invoke('text').then((name) => {
                productName = name;
              });
            } else {
              checkProductStock(index + 1);
            }
          });
      };
      checkProductStock(0);      
    })
  })

  it ('should add an available product and decrement available quantity', () => { 
    
    if (productStock < 0 )  throw new Error("no product available")

    cy.visit(uiProductsUrl + "/" + productId)    
    cy.wait(2000)
    cy.get('[data-cy="detail-product-add"]').click()
    cy.wait(2000)
    cy.url().should('include', '/cart')
    cy.visit(uiProductsUrl + "/" + productId)
    cy.url().should('include', '/' + productId)
    
    const newStock = productStock - 1

    cy.get('[data-cy="detail-product-stock"]').invoke('text')
      .should('match', new RegExp(`^${newStock} en stock$`))

    // verify cart product name
    cy.visit(uiCartUrl)
  
    cy.get('[data-cy="cart-line-name"]').invoke('text').should('match', new RegExp(`${productName}`))

  })

  
  it('shouldn\'t change the product detail quantity to add with negative number and submit', () => {
    cy.visit(uiHomeUrl)
    cy.get('[data-cy="product-home-link"]').first().click()
    cy.get('[data-cy="detail-product-quantity"]').clear().type(-1)
    cy.get('[data-cy="detail-product-form"]').should('have.class', 'ng-invalid')
    cy.get('[data-cy="detail-product-add"]').should('be.disabled')
  });

  it('shouldn\'t change the product detail quantity with null quantity and submit', () => {
    cy.visit(uiHomeUrl)
    cy.get('[data-cy="product-home-link"]').first().click()
    cy.get('[data-cy="detail-product-quantity"]').clear().type(0)    
    cy.get('[data-cy="detail-product-form"]').should('have.class', 'ng-invalid')
    cy.get('[data-cy="detail-product-add"]').should('be.disabled')

    
  });

  it('shouldn\'t change the product detail quantity with quantity of 100 and submit', () => {
    cy.visit(uiHomeUrl)
    cy.get('[data-cy="product-home-link"]').first().click()
    cy.get('[data-cy="detail-product-quantity"]').clear().type(100)
    cy.get('[data-cy="detail-product-add"]').click()
    cy.get('[data-cy="detail-product-form"]').should('have.class', 'ng-invalid')

  });

  it('should add an available product to the cart and be returned by the API', () => {
    // navigate to product details
    cy.visit(uiProductsUrl + "/" + productId)
    cy.url().should('include', '/' + productId)
    cy.get('[data-cy="detail-product-stock"]')
      .invoke("text")
			.should("match", /(0|[1-9][0-9]*) en stock$/)
			.then(text => {
        const stock = parseInt(text.match(/^-?\d+/)[0]);
        if (stock < 0) {
					throw new Error("can not add to cart because of negative stock")
				} else {
          cy.get('[data-cy="detail-product-add"]').click();
          cy.reload()
          cy.api_login_ok().then((response) => {
            const auth_token = response.body.token;
            cy.request({
              method: 'GET',
              url: apiOrdersUrl,
              headers: {
                Authorization: `Bearer ${auth_token}`,
              },
            }).then((response) => {
              const orderLines = response.body.orderLines;
              const productInCart = orderLines.find(
                (orderLine) => orderLine.product.id === parseInt(productId)
              );
              expect(productInCart).to.exist;
              expect (productInCart.product.id).to.equal(parseInt(productId));
            });
          })    
        }
    })

  });


})  



  
