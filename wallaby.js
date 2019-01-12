module.exports = function() {
  return {
    files: [
      "**/*.js",
      "!**/node_modules/**",
      { pattern: "**/*.test.js", ignore: true }
    ],

    tests: ["map-example/*.test.js", "!**/node_modules/**"],

    testFramework: "tape",
    env: {
      type: "node",
      runner: "node"
    }
  }
}
