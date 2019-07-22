module.exports = {
    env: {
        browser: true,
        es6: true,
        node: true,
        'cypress/globals': true,
        jest: true
    },
    extends: ['eslint:recommended', 'plugin:react/recommended', 'prettier', 'prettier/react', 'prettier/standard'],
    globals: {},
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        }
    },
    plugins: ['react', 'import', 'prettier', 'modula', 'cypress'],
    settings: {
        'import/extensions': ['.js', '.jsx'],
        react: {
            createClass: 'createComponent',
            pragma: 'React',
            version: '15.0'
        }
    },
    rules: {
        'prettier/prettier': 'error',
        /**
         * Best Practices
         */
        'block-scoped-var': 'error', // http://eslint.org/docs/rules/block-scoped-var
        complexity: ['error', 9], // http://eslint.org/docs/rules/complexity
        'default-case': 'error', // http://eslint.org/docs/rules/default-case
        'dot-notation': [
            'error',
            {
                // http://eslint.org/docs/rules/dot-notation
                allowKeywords: true
            }
        ],
        eqeqeq: 'error', // http://eslint.org/docs/rules/eqeqeq
        'guard-for-in': 'error', // http://eslint.org/docs/rules/guard-for-in
        'no-alert': 'error', // http://eslint.org/docs/rules/no-alert
        'no-caller': 'error', // http://eslint.org/docs/rules/no-caller
        'no-eq-null': 'error', // http://eslint.org/docs/rules/no-eq-null
        'no-eval': 'error', // http://eslint.org/docs/rules/no-eval
        'no-extend-native': 'error', // http://eslint.org/docs/rules/no-extend-native
        'no-extra-bind': 'error', // http://eslint.org/docs/rules/no-extra-bind
        'no-implied-eval': 'error', // http://eslint.org/docs/rules/no-implied-eval
        'no-lone-blocks': 'error', // http://eslint.org/docs/rules/no-lone-blocks
        'no-loop-func': 'error', // http://eslint.org/docs/rules/no-loop-func
        'no-multi-str': 'error', // http://eslint.org/docs/rules/no-multi-str
        'no-global-assign': 'error', // http://eslint.org/docs/rules/no-global-assign
        'no-new': 'error', // http://eslint.org/docs/rules/no-new
        'no-new-func': 'off', // http://eslint.org/docs/rules/no-new-func
        'no-new-wrappers': 'error', // http://eslint.org/docs/rules/no-new-wrappers
        'no-octal-escape': 'error', // http://eslint.org/docs/rules/no-octal-escape
        'no-param-reassign': 'error', // http://eslint.org/docs/rules/no-param-reassign
        'no-proto': 'error', // http://eslint.org/docs/rules/no-proto
        'no-return-assign': 'error', // http://eslint.org/docs/rules/no-return-assign
        'no-script-url': 'error', // http://eslint.org/docs/rules/no-script-url
        'no-self-compare': 'error', // http://eslint.org/docs/rules/no-self-compare
        'no-sequences': 'error', // http://eslint.org/docs/rules/no-sequences
        'no-throw-literal': 'error', // http://eslint.org/docs/rules/no-throw-literal
        'no-useless-escape': 'off', // https://eslint.org/docs/rules/no-useless-escape
        'no-with': 'error', // http://eslint.org/docs/rules/no-with
        radix: 'error', // http://eslint.org/docs/rules/radix
        'vars-on-top': 'error', // http://eslint.org/docs/rules/vars-on-top
        'wrap-iife': ['error', 'any'], // http://eslint.org/docs/rules/wrap-iife
        yoda: 'error', // http://eslint.org/docs/rules/yoda,

        /**
         * Strict mode
         */
        // babel inserts "use strict"; for us
        // http://eslint.org/docs/rules/strict
        strict: ['error', 'never'],

        /**
         * Variables
         */
        'no-shadow': 'error', // http://eslint.org/docs/rules/no-shadow
        'no-shadow-restricted-names': 'error', // http://eslint.org/docs/rules/no-shadow-restricted-names
        'no-use-before-define': [
            // http://eslint.org/docs/rules/no-use-before-define
            'error',
            {functions: false, classes: true}
        ],

        /**
         * Stylistic Issues
         */
        camelcase: [
            'off',
            {
                // http://eslint.org/docs/rules/camelcase
                properties: 'never'
            }
        ],
        'func-names': [
            // http://eslint.org/docs/rules/func-names
            'error',
            'as-needed'
        ],
        // 'key-spacing': ['error', {
        //     'beforeColon': false,
        //     'afterColon': true,
        //     'mode': 'strict'
        // }], // http://eslint.org/docs/rules/key-spacing
        'max-depth': ['error', 4], // http://eslint.org/docs/rules/max-depth
        'new-cap': [
            'error',
            {
                // http://eslint.org/docs/rules/new-cap
                newIsCap: true,
                capIsNew: false
            }
        ],
        'no-nested-ternary': 'error', // http://eslint.org/docs/rules/no-nested-ternary
        'no-new-object': 'error', // http://eslint.org/docs/rules/no-new-object
        'no-underscore-dangle': 'off', // http://eslint.org/docs/rules/no-underscore-dangle
        'one-var': ['error', 'never'], // http://eslint.org/docs/rules/one-var
        'quote-props': [
            // http://eslint.org/docs/rules/quote-props
            'off',
            'as-needed'
        ],
        'spaced-comment': 'error', // http://eslint.org/docs/rules/spaced-comment
        // 'array-bracket-spacing': ['error', 'never'],
        // 'block-spacing': ['error', 'never'],
        // 'brace-style': ['error', '1tbs'],
        // 'comma-dangle': ['error', 'never'],
        // https://eslint.org/docs/rules/comma-spacing
        'comma-spacing': ['error', {before: false, after: true}],
        // https://eslint.org/docs/rules/func-call-spacing
        'func-call-spacing': ['error', 'never'],
        // https://eslint.org/docs/rules/keyword-spacing
        'keyword-spacing': [
            'error',
            {
                before: true,
                after: true
            }
        ],
        'require-jsdoc': [
            'error',
            {
                require: {
                    FunctionDeclaration: true,
                    MethodDefinition: false
                }
            }
        ],
        // 'space-infix-ops': 'error', // https://eslint.org/docs/rules/space-infix-ops
        'arrow-parens': ['error', 'as-needed'], // https://eslint.org/docs/rules/arrow-parens

        /**
         * ES6
         */
        'no-var': 'error', // http://eslint.org/docs/rules/no-var

        /**
         * ES6 import
         */
        'import/default': 'error', // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/default.md
        'import/named': 'error', // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/named.md
        'import/no-named-as-default': 'off', // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-named-as-default.md
        'import/no-named-default': 'error', // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-named-default.md#no-named-default
        'import/no-namespace': 'off', // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-namespace.md
        'import/no-nodejs-modules': 'error', // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-nodejs-modules.md
        'import/newline-after-import': 'off', // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/newline-after-import.md

        /**
         * JSX and React style
         */
        'react/display-name': 'off',
        'react/jsx-boolean-value': 'off',
        'react/jsx-key': 'error',
        'react/jsx-no-undef': 'error',
        'react/jsx-sort-props': 'off',
        'react/jsx-sort-prop-types': 'off',
        'react/jsx-uses-react': 'error',
        'react/jsx-no-target-blank': 'off',
        'react/no-unescaped-entities': ['error', {forbid: ['>', '}']}],
        'react/jsx-uses-vars': 'error',
        'react/no-danger': 'warn',
        'react/no-did-mount-set-state': 'error',
        'react/no-did-update-set-state': 'error',
        'react/no-multi-comp': ['off', {ignoreStateless: true}],
        'react/no-unknown-property': 'error',
        'react/prop-types': ['error', {skipUndeclared: true}],
        'react/react-in-jsx-scope': 'off',
        'react/self-closing-comp': 'off',
        'react/require-render-return': 'error',
        'react/sort-comp': [
            'error',
            {
                order: ['static-methods', 'lifecycle', 'rendering', 'everything-else'],
                groups: {
                    rendering: ['/^render.+$/', 'render']
                }
            }
        ],
        /**
         * Modula rules
         */
        'modula/no-mutable-prop-types-in-models': 'error', // https://git.dev.fwmrm.net/us-web/eslint-plugin-modula
        // 'modula/no-mutable-event-types-payload-in-models': 'error',
        'modula/gettext-params': 'error',
        'modula/createmodel-attrs-order': 'warn',
        'modula/use-function-in-model-defaults': 'error'
    }
};
