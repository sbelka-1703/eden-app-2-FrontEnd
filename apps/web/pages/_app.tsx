import "../styles/global.css";

import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "@graphql/eden";
import type { AppProps } from "next/app";
import * as React from "react";

import { Layout } from "../layout";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ApolloProvider client={apolloClient}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
};

export default App;
