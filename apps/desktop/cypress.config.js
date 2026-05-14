const { defineConfig } = require('cypress');

try {
  require('dotenv').config({ path: '../.env' });
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

