const withTM = require("next-transpile-modules")([
  "@eden/package-ui",
  "@eden/package-context",
]);

module.exports = withTM({
  reactStrictMode: true,
});
