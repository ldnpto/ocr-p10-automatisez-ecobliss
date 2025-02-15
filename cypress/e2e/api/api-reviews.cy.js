var auth_token = null;
const apiReviewsUrl = Cypress.env("apiBaseUrl") + "/reviews";

before(() => {
    cy.api_login_ok().then((response) => {
      auth_token = response.body.token;
    })    
})

context("verify add review without script and with script", () => {
    
  it("should add a review without script", () => {    
    cy.request({
      method: "POST",
      url: apiReviewsUrl,
      headers: {
        Authorization: `Bearer ${auth_token}`
      },
      body: {
        "title": "Great product",
        "comment": "Yes it's a great product",
        "rating": 5,        
      }
    }).then((response) => {
      expect(response.status).to.eq(200)
    })
  })

  it("should not add a review with script", () => {    
    cy.request({
      method: "POST",
      url: apiReviewsUrl,
      headers: {
        Authorization: `Bearer ${auth_token}`
      },
      body: {
        "title": "Great product",
        "comment": "<script>alert('xss injection')</script>",
        "rating": 5,
        
      }
    }).then((response) => {
      expect(response.status).to.eq(500)
    })
  })

  
  it("should not add a review with long title", () => {    
    cy.request({
      method: "POST",
      url: apiReviewsUrl,
      headers: {
        Authorization: `Bearer ${auth_token}`
      },
      body: {
        "title": "My very Long Title My very Long Title  My very Long Title My very Long Title My very Long Title My very Long Title My very Long Title My very Long Title My very Long Title My very Long Title  My very Long Title",
        "comment": "Yes it's a great product",
        "rating": 5,
        
      }
    }).then((response) => {
      expect(response.status).to.eq(500)
    })
  })

  
  it("should not add a review with symbols in title", () => {    
    cy.request({
      method: "POST",
      url: apiReviewsUrl,
      headers: {
        Authorization: `Bearer ${auth_token}`
      },
      body: {
        "title": "My special Title$#@!",
        "comment": "Yes it's a great product",
        "rating": 5,
        
      }
    }).then((response) => {
      expect(response.status).to.eq(500)
    })
  })


})