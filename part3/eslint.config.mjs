import globals from "globals";
import js from "@eslint/js"
import stylisticJs from "@stylistic/eslint-plugin-js"
import { defineConfig } from "eslint/config";

export default defineConfig([
  // (1301) imports predefined config for ESLint
  // and applied first before our custom options
  js.configs.recommended,
  { 
    files: ["**/*.js"], 
    languageOptions: {
      // (1259) yep, for require/module
      sourceType: "commonjs",
      // (1259) includes the `process` settings
      // contrasts with `browser` settings' like
      // `.window` and `.document`
      globals: { ...globals.node },
      // (1300) yeah specifies the latest features
      ecmaVersion: 'latest',
    },
    plugins: { 
      '@stylistic/js': stylisticJs,
    },
    rules: { 
      '@stylistic/js/indent': ['error', 2],
      '@stylistic/js/linebreak-style': ['error', 'unix'],
      '@stylistic/js/quotes': ['error', 'single'],
      // (1710) thank god we're not using semicolons;
      '@stylistic/js/semi': ['error', 'never'],
      eqeqeq: 'error',
      // (1713) the spacing rules are also pretty nice
      'no-trailing-spaces': 'error',
      'object-curly-spacing': ['error', 'always'],
      'arrow-spacing': ['error', { before: true, after: true }],
      // (1713) yea it's nice to use console.log while developing
      'no-console': 'off',
    },
  },
  { 
    files: ["**/*.{js,mjs,cjs}"], 
    languageOptions: { globals: globals.node }
  },
  {
    ignores: ['dist/**', 'phonebook/dist/**'],
  },
]);
