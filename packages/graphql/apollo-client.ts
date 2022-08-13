import {
  ApolloClient,
  ApolloLink,
  from,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { RetryLink } from "@apollo/client/link/retry";

// Soil API endpoint
const SOIL_API_URL = "https://oasis-bot-test-deploy.herokuapp.com/graphql";
const httpLinkSoil = new HttpLink({ uri: SOIL_API_URL });

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
const NEO_API_URL = "https://oasis-bot-test-deploy.herokuapp.com/graphql";
const httpLinkNeo = new HttpLink({ uri: NEO_API_URL });

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

export const apolloClient = new ApolloClient({
  link: from([errorLink, directionalLink]),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {},
      },
    },
  }),
});
