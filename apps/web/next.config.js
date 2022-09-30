const withTM = require("next-transpile-modules")([
  "ui",
  "@eden/package-context",
]);

module.exports = withTM({
  reactStrictMode: true,
});
