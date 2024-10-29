// cypress.config.js
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Conecte o Mochawesome ao Cypress
      require("cypress-mochawesome-reporter/plugin")(on);
    },
  },
});
