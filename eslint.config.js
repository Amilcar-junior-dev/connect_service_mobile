const { SourceCode, Linter } = require('eslint');
const expoConfig = require('eslint-config-expo/flat');

// Polyfill for ESLint 10 compatibility with legacy plugins (eslint-plugin-import, eslint-plugin-react)
if (SourceCode && SourceCode.prototype) {
  if (!SourceCode.prototype.getTokenOrCommentAfter) {
    SourceCode.prototype.getTokenOrCommentAfter = function (node, options) {
      return this.getTokenAfter(node, typeof options === 'number' ? { includeComments: true, skip: options } : { includeComments: true, ...options });
    };
  }
  if (!SourceCode.prototype.getTokenOrCommentBefore) {
    SourceCode.prototype.getTokenOrCommentBefore = function (node, options) {
      return this.getTokenBefore(node, typeof options === 'number' ? { includeComments: true, skip: options } : { includeComments: true, ...options });
    };
  }
  if (!SourceCode.prototype.getComments) {
    SourceCode.prototype.getComments = function (node) {
      return {
        leading: this.getCommentsBefore(node),
        trailing: this.getCommentsAfter(node),
      };
    };
  }
}

module.exports = [
  ...expoConfig,
  {
    ignores: [
      'node_modules/**',
      '.expo/**',
      'dist/**',
      'build/**',
      'ios/**',
      'android/**',
      '.notion-sync/**',
      'coverage/**',
    ],
  },
  {
    settings: {
      react: {
        version: '19.1.0',
      },
    },
    rules: {
      // 1. Regras do React & Hooks
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react/jsx-no-duplicate-props': 'error',

      // 2. Regras de TypeScript
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',

      // 3. Regras de Sintaxe e Qualidade
      semi: ['warn', 'always'],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-duplicate-imports': 'off',
      'import/no-duplicates': 'error',

      // 4. Ordenação Estrita dos Blocos de Importação
      'import/order': [
        'warn',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling', 'index'],
          ],
          pathGroups: [
            {
              pattern: 'react',
              group: 'external',
              position: 'before',
            },
            {
              pattern: 'react-native',
              group: 'external',
              position: 'before',
            },
            {
              pattern: 'expo*',
              group: 'external',
              position: 'before',
            },
            {
              pattern: '~/**',
              group: 'internal',
              position: 'before',
            },
          ],
          pathGroupsExcludedImportTypes: ['react', 'react-native'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
    },
  },
];
