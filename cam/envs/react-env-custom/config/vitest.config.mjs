// Vitest disabled as causing require error
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const setupPathName = require.resolve('../setup/setup-tests.mjs');

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: [setupPathName],
  },
});
