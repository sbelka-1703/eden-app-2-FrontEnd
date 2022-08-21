import "../styles/global.css";

import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "@graphql/eden";
import type { AppProps } from "next/app";
import * as React from "react";
import { AppLayout } from "ui";

import { UserProvider } from "../context";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ApolloProvider client={apolloClient}>
      <UserProvider>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </UserProvider>
    </ApolloProvider>
  );
};

export default App;
