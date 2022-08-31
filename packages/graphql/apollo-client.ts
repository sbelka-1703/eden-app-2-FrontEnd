import fetch from "cross-fetch";
import {
  ApolloClient,
  ApolloLink,
  from,
  HttpLink,
  InMemoryCache,
  split,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { RetryLink } from "@apollo/client/link/retry";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";

// const soilUrl = NEXT_PUBLIC_GRAPHQL_URI;

// Soil API endpoint
// const SOIL_API_URL = soilUrl;
const SOIL_API_URL = "https://oasis-bot-test-deploy.herokuapp.com/graphql";
const httpLinkSoil = new HttpLink({ uri: SOIL_API_URL, fetch });

const soilLink = new ApolloLink((operation, forward) => {
  // Use the setContext method to set the HTTP headers.
  operation.setContext({
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });
  // Call the next link in the middleware chain.
  return forward(operation);
});

// Neo API endpoint
// TODO: NEED TO CHANGE TO NEO ENDPOINT
// const NEO_API_URL = soilUrl;
const NEO_API_URL = "https://oasis-bot-test-deploy.herokuapp.com/graphql";
const httpLinkNeo = new HttpLink({ uri: NEO_API_URL, fetch });

const neoLink = new ApolloLink((operation, forward) => {
  // Use the setContext method to set the HTTP headers.
  operation.setContext({
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });
  // Call the next link in the middleware chain.
  return forward(operation);
});

const directionalLink = new RetryLink().split(
  (operation) => operation.getContext().serviceName === "soilservice",
  soilLink.concat(httpLinkSoil),
  neoLink.concat(httpLinkNeo)
);

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) graphQLErrors.map(({ message }) => console.log(message));
});

const wsLink =
  typeof window !== "undefined"
    ? new GraphQLWsLink(
        createClient({
          url: "wss://oasis-bot-test-deploy.herokuapp.com/graphql",
        })
      )
    : null;

const splitLink =
  typeof window !== "undefined" && wsLink
    ? split(
        ({ query }) => {
          const definition = getMainDefinition(query);
          return (
            definition.kind === "OperationDefinition" &&
            definition.operation === "subscription"
          );
        },
        wsLink,
        directionalLink
      )
    : directionalLink;

export const apolloClient = new ApolloClient({
  link: from([errorLink, splitLink]),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {},
      },
    },
  }),
});
