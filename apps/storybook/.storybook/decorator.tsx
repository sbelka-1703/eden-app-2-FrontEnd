import { Story } from "@storybook/react";
import { UserContext } from "@eden/package-context";
import { SessionProvider } from "next-auth/react";

import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "@eden/package-graphql";
import { getMember } from "@eden/package-mock";
import { Members } from "@eden/package-graphql/generated";
import React from "react";

/**
 * A storybook decorator which wraps components in a mock apollo context.
 */
export const ApolloDecorator = (Story: Story) => {
  return (
    <ApolloProvider client={apolloClient}>
      <Story />
    </ApolloProvider>
  );
};

/**
 * A storybook decorator which wraps components in a mock userContext.
 */

const injectContext = {
  currentUser: getMember(),
  memberFound: true,
  setCurrentUser: (user: Members) => {
    console.log("setCurrentUser", user);
    // injectContext.currentUser = user;
  },
  refechProfile: () => {},
};

export const CurrentUserDecorator = (Story: Story) => {
  return (
    <SessionProvider>
      <UserContext.Provider value={injectContext}>
        <Story />
      </UserContext.Provider>
    </SessionProvider>
  );
};
