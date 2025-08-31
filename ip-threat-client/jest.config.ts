import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.jest.json',
    },
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'], // <-- כאן מוסיפים

};

export default config;
