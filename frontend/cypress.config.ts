import { defineConfig } from "cypress";

export default defineConfig({
  allowCypressEnv: false,

  e2e: {
    baseUrl: `http://localhost:5100`,
    chromeWebSecurity: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

// previous file from root, cypress.config.js, deprecated
// for reference only

// 
// module.exports = {
//   allowCypressEnv: false,

//   e2e: {
//     baseUrl: `http://localhost:5100`,
//     chromeWebSecurity: false,
//     setupNodeEvents(on, config) {
//       // implement node event listeners here
//     },
//   },
// };
