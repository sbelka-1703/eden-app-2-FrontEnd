const path = require("path");

module.exports = {
  stories: ["../../../packages/ui/src/**/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "storybook-addon-apollo-client",
    {
      name: "@storybook/addon-postcss",
      options: {
        postcssLoaderOptions: {
          implementation: require("postcss"),
        },
      },
    },
  ],
  framework: "@storybook/react",
  core: {
    builder: "webpack5",
  },
  webpackFinal: async (config: {
    module: {
      rules: {
        test: RegExp;
        use: {
          loader: string;
          options: { postcssOptions: { plugins: any[] } };
        }[];
        include: any;
      }[];
    };
  }) => {
    config.module.rules.push({
      test: /\.css$/,
      use: [
        {
          loader: "postcss-loader",
          options: {
            postcssOptions: {
              plugins: [require("tailwindcss"), require("autoprefixer")],
            },
          },
        },
      ],
      include: path.resolve(__dirname, "../"),
    });
    // /**
    //  * Add support for alias-imports
    //  * @see https://github.com/storybookjs/storybook/issues/11989#issuecomment-715524391
    //  */
    // config.resolve.alias = {
    //   ...config.resolve?.alias,
    //   "@": [path.resolve(__dirname, "../src/"), path.resolve(__dirname, "../")],
    // };

    // /**
    //  * Fixes font import with /
    //  * @see https://github.com/storybookjs/storybook/issues/12844#issuecomment-867544160
    //  */
    // config.resolve.roots = [
    //   path.resolve(__dirname, "../public"),
    //   "node_modules",
    // ];

    return config;
  },
};
