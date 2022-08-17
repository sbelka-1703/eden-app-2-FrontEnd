import { Story } from "@storybook/react";

import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "@graphql/eden";

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
