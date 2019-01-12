module.exports = function() {
  return {
    files: [
      "**/*.js",
      "!**/node_modules/**",
      { pattern: "**/*.test.js", ignore: true }
    ],

    tests: ["**/*.test.js", "!**/node_modules/**", "!**/src/App.*"],

    testFramework: "tape",
    env: {
      type: "node",
      runner: "node"
    }
  }
}
