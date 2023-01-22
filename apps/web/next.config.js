const withTM = require("next-transpile-modules")([
  "@eden/package-ui",
  "@eden/package-context",
  "@eden/package-graphql",
  "@eden/package-mock",
]);

module.exports = withTM({
  reactStrictMode: true,
});
