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
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ],
}
