module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
        sourceType: 'module' // Allows for the use of imports
    },
    plugins: ['@typescript-eslint/eslint-plugin'],
    extends: [
        'airbnb-typescript/base',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'plugin:jest/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended' // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    ],
    root: true,
    ignorePatterns: ['.eslintrc.js'],
    rules: {
        // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
        // e.g. "@typescript-eslint/explicit-function-return-type": "off",
        'import/no-default-export': 'error',
        'import/prefer-default-export': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/interface-name-prefix': 'off',
        'class-methods-use-this': 'warn',
        'filenames/match-regex': [2, '^[0-9a-z-.]+$', true],
        'no-process-env': 'error'
        // comment indentation rule first since get problem with prettier and eslint
        // since from this https://stackoverflow.com/questions/56337176/prettier-and-eslint-indents-not-working-together we should disable indentation rule when we use prettier
        // ',@typescript-eslint/indent': ['error', 4],
    },
    env: {
        'jest/globals': true
    },
    settings: {
        'import/resolver': {
            alias: {
                map: [['src/*', './src/']],
                extensions: ['.ts', '.js', '.json']
            }
        }
    }
};
