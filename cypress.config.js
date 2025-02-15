const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    apiBaseUrl: 'http://localhost:8081',
    frontBaseUrl: 'http://localhost:8080/#',
    username: 'test2@test.fr',
    password: 'testtest' 
  },
  e2e: {    
    setupNodeEvents(on, config) {      
    },
  },
});
