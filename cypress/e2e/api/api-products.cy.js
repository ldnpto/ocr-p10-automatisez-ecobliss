
var auth_token = null;
const apiProductsUrl = Cypress.env("apiBaseUrl") + "/products";

before(() => {
  cy.api_login_ok().then((response) => {
    auth_token = response.body.token;
  })    
})

context("verify return of products and product details", () => {

  var productId = null;
  it("should returns products", () => {
    cy.request({
      method: "GET",
      url: apiProductsUrl,
      headers: {
        Authorization: `Bearer ${auth_token}`
      }
    }).then((response) => {      
      expect(response.status).to.eq(200)
      expect(response.body[Math.floor(Math.random() * response.body.length)]).to.have.property('id')
      productId = response.body[Math.floor(Math.random() * response.body.length)].id
      expect(productId).to.be.a("number");
    })
  })


  it('should return details of a product by ID', () => {
    cy.request({
      method: "GET",
      url: apiProductsUrl + `/${productId}`,
      headers: {
        Authorization: `Bearer ${auth_token}`
      }      
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property("name")      
      expect(response.body.name).to.be.a("string");
      expect(response.body).to.have.property("availableStock")
      expect(response.body.availableStock).to.be.a("number");
      expect(response.body).to.have.property("skin")
      expect(response.body.skin).to.be.a("string");
      expect(response.body).to.have.property("aromas")
      expect(response.body.aromas).to.be.a("string");
      expect(response.body).to.have.property("ingredients")
      expect(response.body.ingredients).to.be.a("string");
      expect(response.body).to.have.property("description")
      expect(response.body.description).to.be.a("string");
      expect(response.body).to.have.property("price")      
      expect(response.body.price).to.be.a("number");


    });
});

})

