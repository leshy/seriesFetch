module.exports = {
  preset: 'ts-jest',
  verbose: false,
  roots: [
    "<rootDir>/src"
  ],
  testEnvironment: 'node',
  coverageReporters: [
    "text",
    "json-summary"
  ],
  modulePathIgnorePatterns: [ 'mock' ],
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ],
}
