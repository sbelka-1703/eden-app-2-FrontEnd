import { ApolloProvider } from "@apollo/client";
import { MockedProvider } from "@apollo/client/testing";
import { UserContext, UserContextType } from "@eden/package-context";
import { apolloClient } from "@eden/package-graphql";
import { Members } from "@eden/package-graphql/generated";
import { getMember } from "@eden/package-mock";
import { DecoratorFn } from "@storybook/react";
import { SessionProvider } from "next-auth/react";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider/next-12";
import * as React from "react";
import "./global.css";

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
  options: {
    storySort: {
      method: "alphabetical",
      order: [
        "Design System",
        "Cards",
        ["Project", "User"],
        "Charts",
        "Components",
        "Containers",
        ["CreateProject"],
        "Elements",
        "Info",
        "Layout",
        "Lists",
        "Modals",
        "Sections",
        "Selectors",
        "Steppers",
        "*",
        "Archive",
      ],
    },
  },
  // controls: { expanded: true },
  // viewMode: 'docs',
};

const injectContext: UserContextType = {
  currentUser: getMember(),
  setCurrentUser: (user: Members) => {
    console.log("setCurrentUser", user);
    // injectContext.currentUser = user;
  },
  refechProfile: () => {},
  memberServers: [],
  memberServerIDs: [],
  selectedServer: null,
  setSelectedServer: () => {},
};

export const decorators: DecoratorFn[] = [
  (Story) => (
    <MemoryRouterProvider>
      <Story />
    </MemoryRouterProvider>
  ),
  (Story) => (
    <ApolloProvider client={apolloClient}>
      <Story />
    </ApolloProvider>
  ),
  (Story) => (
    <SessionProvider>
      <UserContext.Provider value={injectContext}>
        <Story />
      </UserContext.Provider>
    </SessionProvider>
  ),
];
