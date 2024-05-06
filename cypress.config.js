const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: { 
    "baseUrl": "https://www.saucedemo.com",
    "chromeWebSecurity": false,
    setupNodeEvents(on, config) {
    },
  },
});