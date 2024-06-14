// my-custom-environment
const JsDomEnvironment = require('jest-environment-jsdom').TestEnvironment;

class CustomEnvironment extends JsDomEnvironment {
  async setup() {
    await super.setup();
    // Allow setting up a websocket server in jsdom environment
  }

  async teardown() {
    await super.teardown();
  }

  getVmContext() {
    return super.getVmContext();
  }
}

module.exports = CustomEnvironment;
