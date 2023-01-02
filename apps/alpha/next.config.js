const withTM = require("next-transpile-modules")([
  "@eden/package-ui",
  "@eden/package-context",
  "@eden/package-graphql",
]);

module.exports = withTM({
  reactStrictMode: true,
});
