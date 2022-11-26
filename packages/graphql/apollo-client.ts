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

// Eden API endpoint
const EDEN_API_WSS = process.env.NEXT_PUBLIC_GRAPHQL_WSS || "";
const EDEN_API_URL = process.env.NEXT_PUBLIC_GRAPHQL_URL;
const httpLinkEden = new HttpLink({ uri: EDEN_API_URL, fetch });

const edenLink = new ApolloLink((operation, forward) => {
  // Use the setContext method to set the HTTP headers.
  operation.setContext({
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });
  // Call the next link in the middleware chain.
  return forward(operation);
});

// Extra API endpoint
// const EXTRA_API_URL = process.env.NEXT_PUBLIC_GRAPHQL_NODE_URL;
const httpLinkExtra = new HttpLink({ uri: EDEN_API_URL, fetch });

// const NEXT_PUBLIC_GRAPHQL_NODE_URL

const extraLink = new ApolloLink((operation, forward) => {
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
  edenLink.concat(httpLinkEden),
  extraLink.concat(httpLinkExtra)
);

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) graphQLErrors.map(({ message }) => console.log(message));
});

const wsLink =
  typeof window !== "undefined"
    ? new GraphQLWsLink(
        createClient({
          url: `${EDEN_API_WSS}`,
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
  ssrMode: typeof window === "undefined",
  link: from([errorLink, splitLink]),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          // testing for caching current user
          // findMember: cacheMerge(["fields", ["_id"]]),
          // memberUpdated: cacheMerge(["fields", ["_id"]]),
          // memberUpdated: {
          //   keyArgs: false,
          //   merge(existing = [], incoming: any[]) {
          //     return [...existing, ...incoming];
          //   },
          // },
          // findMember: {
          //   keyArgs: ["_id"],
          // },
          // findMembers: {
          //   keyArgs: ["_id"],
          // },
          // freezes the cache
          // findProject: {
          //   keyArgs: ["_id"],
          // },
          findProjects: {
            keyArgs: ["_id"],
          },
          // findSkills: {
          //   keyArgs: ["_id"],
          // },
          findRoom: {
            keyArgs: ["_id"],
          },
        },
      },
    },
  }),
});

// const cacheMerge = (keyArgs: any) => {
//   return {
//     keyArgs: [keyArgs],
//     merge(existing: any, incoming: any) {
//       if (!existing) {
//         return incoming;
//       }
//       const existingItems = existing.items;
//       const incomingItems = incoming.items;

//       return {
//         items: existingItems.concat(incomingItems),
//         // pageInfo: incoming.pageInfo,
//       };
//     },
//   };
// };
