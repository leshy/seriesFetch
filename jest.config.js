module.exports = {
  preset: 'ts-jest',
  roots: [
    "<rootDir>/src"
  ],
  testEnvironment: 'node',
  "coverageReporters": [
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
