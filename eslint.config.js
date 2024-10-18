import globals from 'globals';
import pluginJs from '@eslint/js';

export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser, // Keep browser globals for Playwright
        process: 'readonly', // Define process as a read-only global
      },
    },
  },
  pluginJs.configs.recommended,
];
