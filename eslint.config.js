import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{js,mjs,cjs,jsx}"]},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    rules: {
        "no-unused-vars": "warn",
        "no-undef": "warn",
        "react/prop-types" : "warn"
    }
  },
  {
    settings: {
      react: {
        version: 'detect'
      }
    }
  }

];