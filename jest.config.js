module.exports = {
  automock: false,
  bail: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/test/**/*.spec.ts'],
  setupFiles: ['<rootDir>/test/setup.js'],
  modulePathIgnorePatterns: ['<rootDir>/dist'],
  globals: {
    'ts-jest': {
      preset: 'ts-jest',
      diagnostics: {
        // Ignore the "Object is possibly 'undefined'" typescript warning in tests
        // https://huafu.github.io/ts-jest/user/config/diagnostics
        ignoreCodes: [2532]
      }
    }
  }
};
