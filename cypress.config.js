module.exports = {
  allowCypressEnv: false,

  e2e: {
    baseUrl: `http://localhost:5100`,
    chromeWebSecurity: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
};
