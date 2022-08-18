import "./global.css";
import { MockedProvider } from "@apollo/client/testing";

export const parameters = {
  apolloClient: {
    MockedProvider,
    // any props you want to pass to MockedProvider on every story
  },
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  // controls: { expanded: true },
  // viewMode: 'docs',
};
