module.exports = {
  preset: "ts-jest",
  testEnvironment: "node", // Use "jsdom" for frontend projects
  collectCoverage:true,
  coverageDirectory:"coverage",
  coverageReporters:["text","lcov"],
  collectCoverageFrom:[
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts", // Exclude TypeScript declaration files
  ],
  moduleFileExtensions: ["ts", "tsx", "js"],
  testMatch: ["**/specs/**/*.test.ts"],
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  clearMocks: true, // Clears mock calls and instances between tests
};
