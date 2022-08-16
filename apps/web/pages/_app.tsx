import "../styles/global.css";

import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "@graphql/eden";
import type { AppProps } from "next/app";
import * as React from "react";
import { AppLayout } from "ui";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ApolloProvider client={apolloClient}>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </ApolloProvider>
  );
};

export default App;
