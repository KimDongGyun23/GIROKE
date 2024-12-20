import pluginJs from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import eslintPluginImport from 'eslint-plugin-import'
import eslintPluginJsxA11y from 'eslint-plugin-jsx-a11y'
import eslintPluginPrettier from 'eslint-plugin-prettier'
import pluginReact from 'eslint-plugin-react'
import eslintPluginSimpleImportSort from 'eslint-plugin-simple-import-sort'
import eslintPluginTailwindcss from 'eslint-plugin-tailwindcss'
import eslintPluginUnusedImports from 'eslint-plugin-unused-imports'
import globals from 'globals'
import tseslint from 'typescript-eslint'

/** @type {import('eslint').Linter.Config[]} */
export default [
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  eslintConfigPrettier,
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      globals: { ...globals.browser },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react: pluginReact,
      prettier: eslintPluginPrettier,
      'unused-imports': eslintPluginUnusedImports,
      'simple-import-sort': eslintPluginSimpleImportSort,
      import: eslintPluginImport,
      'jsx-a11y': eslintPluginJsxA11y,
      tailwindcss: eslintPluginTailwindcss,
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'error',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
      'no-duplicate-imports': 'off',
      'import/newline-after-import': 'warn',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          ignoreRestSiblings: true,
          argsIgnorePattern: '_',
          varsIgnorePattern: '_',
        },
      ],
      'simple-import-sort/imports': [
        'warn',
        {
          groups: [
            ['^react', '^@?\\w'],
            ['@/(.*)'],
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
          ],
        },
      ],
      'simple-import-sort/exports': 'warn',
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
        },
      ],
    },
    settings: {
      'import/resolver': {
        node: {
          paths: ['src'],
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
        react: {
          version: 'detect',
        },
        typescript: {
          project: ['./tsconfig.json', './tsconfig.node.json'],
        },
        alias: {
          map: [['~', '@']],
          extensions: ['.js', '.jsx', '.ts', '.d.ts', '.tsx'],
        },
      },
    },
  },
]
