const { defineConfig } = require('cypress');

try {
  require('dotenv').config({ path: '../../.env' });
} catch {
  // dotenv not available in Docker, env vars injected by compose
}

module.exports = defineConfig({
  allowCypressEnv: false,

  e2e: {
    baseUrl: process.env.CYPRESS_baseUrl,
    chromeWebSecurity: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});



////// this is sitting here in case I ever change the module type and don't want to hunt down this syntax
// import { defineConfig } from "cypress";

// export default defineConfig({
//   allowCypressEnv: false,

//   e2e: {
//     baseUrl: `http://localhost:5100`,
//     chromeWebSecurity: false,
//     setupNodeEvents(on, config) {
//       // implement node event listeners here
//     },
//   },
// });

