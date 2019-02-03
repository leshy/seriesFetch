module.exports = {
  preset: 'ts-jest',
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
