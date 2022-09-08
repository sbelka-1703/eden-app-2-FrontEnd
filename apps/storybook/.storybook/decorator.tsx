import { Story } from "@storybook/react";
import { UserContext } from "@context/eden";
import { SessionProvider } from "next-auth/react";

import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "@graphql/eden";
import { getMember } from "../mocks";
import { Members } from "@graphql/eden/generated";

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
