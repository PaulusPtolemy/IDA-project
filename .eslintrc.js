module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
    },
    parserOptions: {
        parser: '@typescript-eslint/parser',
    },
    plugins: ['@typescript-eslint'],
    extends: [
        '@nuxtjs/eslint-config-typescript',
        'plugin:vue/recommended',
    ],
    // add your custom rules here
    rules: {
        'linebreak-style': [
            'error',
            'unix',
        ],
        quotes: [
            'error',
            'single',
        ],
        indent: 'off',
        'space-before-function-paren': ['error', 'never'],
        'arrow-parens': ['error', 'as-needed'],
        'comma-dangle': ['error', 'always-multiline'],
        'no-console': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        'vue/html-closing-bracket-newline': 'off',
        'vue/html-indent': 'off',
        'vue/max-attributes-per-line': 'off',
        'vue/html-self-closing': 'off',
        'vue/require-default-prop': 'off',
        'vue/no-v-html': 'off',
        'vue/multiline-html-element-content-newline': 'off',
        'vue/singleline-html-element-content-newline': 'off',
        'vue/html-closing-bracket-spacing': 'off',
        'vue/attribute-hyphenation': [
            'error',
            'always',
            {
                ignore: [
                    'viewBox',
                ],
            },
        ],
    },
}
