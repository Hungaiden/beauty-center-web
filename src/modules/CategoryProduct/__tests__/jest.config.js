// src/modules/CategoryProduct/__tests__/jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: '../../../../..', // đi lên từ __tests__ đến thư mục gốc dự án
  testMatch: [
    '<rootDir>/src/modules/CategoryProduct/__tests__/**/*.spec.ts',
  ],
  moduleFileExtensions: ['ts', 'js'],
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
  },
  coverageDirectory: '<rootDir>/coverage',
  collectCoverageFrom: [
    '<rootDir>/src/modules/CategoryProduct/**/*.{ts,tsx}',
  ],
};
