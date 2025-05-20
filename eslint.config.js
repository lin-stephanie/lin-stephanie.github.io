import globals from 'globals'
import js from '@eslint/js'
import ts from 'typescript-eslint'

import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

import prettier from 'eslint-config-prettier/flat'

export default ts.config(
  {
    // https://eslint.org/docs/latest/use/configure/configuration-files#globally-ignoring-files-with-ignores
    ignores: ['dist', '.local', '*.glb'],
  },
  {
    // https://eslint.org/docs/latest/use/configure/language-options
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },

  // https://eslint.org/docs/latest/use/configure/configuration-files#using-predefined-configurations
  js.configs.recommended,

  // https://typescript-eslint.io/users/configs/#eslint-recommended
  ts.configs.eslintRecommended,
  // https://typescript-eslint.io/users/configs/#recommended-configurations
  ts.configs.recommended,
  ts.configs.stylistic,

  // https://github.com/jsx-eslint/eslint-plugin-react?tab=readme-ov-file#flat-configs
  react.configs.flat.recommended,
  react.configs.flat['jsx-runtime'],

  // https://www.npmjs.com/package/eslint-plugin-react-hooks
  reactHooks.configs['recommended-latest'],

  // https://www.npmjs.com/package/eslint-plugin-react-refresh
  reactRefresh.configs.recommended,
  reactRefresh.configs.vite,

  // https://github.com/prettier/eslint-config-prettier?tab=readme-ov-file#installation
  prettier,

  {
    files: ['**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}'],
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      // https://github.com/pmndrs/react-three-fiber/issues/2623
      'react/no-unknown-property': [
        'error',
        {
          ignore: [
            'map',
            'intensity',
            'position',
            'rotation',
            'geometry',
            'material',
            'matcap',
            'castShadow',
            'receiveShadow',
            'raycast',
            'side',
            'onPointerMissed',
            'toneMapped',
            'threshold',
            'strength',
            'args',
          ],
        },
      ],
    },
  }
)
