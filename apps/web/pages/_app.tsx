import "../styles/global.css";

import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "@graphql/eden";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import * as React from "react";
import { AppLayout } from "ui";

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  return (
    <SessionProvider session={session}>
      <ApolloProvider client={apolloClient}>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </ApolloProvider>
    </SessionProvider>
  );
};

export default App;
