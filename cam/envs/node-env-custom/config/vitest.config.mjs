import { defineConfig } from 'vite';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const pathName = require.resolve('../setup/mongo-memory-server.mjs');


export default defineConfig({
  plugins: [],
  test: {
    setupFiles: [
      pathName
    ],
  },
});
