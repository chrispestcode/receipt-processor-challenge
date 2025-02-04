module.exports = {
    transform: {
        '^.+\\.m?js$': 'babel-jest'
    },
    testEnvironment: 'node',
    moduleFileExtensions: ['js', 'mjs'],
    testMatch: ['**/__tests__/**/*.test.js', '**/e2e/**/*.spec.js'],
    transformIgnorePatterns: []
};
  