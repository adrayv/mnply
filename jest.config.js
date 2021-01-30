module.exports = {
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
    // "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
};

// testing set up from https://medium.com/frontend-digest/setting-up-testing-library-with-nextjs-a9702cbde32d
