// eslint.config.mjs
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import globals from "globals";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  // Presets do Next + TS (via compat)
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Ignora pastas/arquivos gerados
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "public/**",
      "content/**",
      "coverage/**",
      ".vercel/**",
      "next-env.d.ts",
      "**/*.d.ts",
    ],
  },

  // Linguagem/globais aplicados ao projeto inteiro
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },

  // (Opcional) garantir contexto Node em scripts/configs
  {
    files: [
      "**/*.config.{js,cjs,mjs}",
      "scripts/**/*.{js,cjs,mjs}",
      "*.mjs",
    ],
    languageOptions: {
      globals: { ...globals.node },
    },
  },

  // (Opcional) ajustes de regras do projeto:
  // { rules: { "react/jsx-key": "off" } },
];
