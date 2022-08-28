const withTM = require("next-transpile-modules")(["ui", "@context/eden"]);

module.exports = withTM({
  reactStrictMode: true,
});
