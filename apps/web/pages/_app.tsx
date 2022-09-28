import "../styles/global.css";

import { ApolloProvider } from "@apollo/client";
import { UserProvider } from "@context/eden";
import { apolloClient } from "@graphql/eden";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import Script from "next/script";
import { SessionProvider } from "next-auth/react";
import type { ReactElement, ReactNode } from "react";
import * as React from "react";

import { IS_DEVELOPMENT, IS_PRODUCTION } from "../constants";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  // eslint-disable-next-line no-unused-vars
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const App = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page);

  console.log(IS_DEVELOPMENT ? "development" : "production");

  return (
    <SessionProvider session={session}>
      <ApolloProvider client={apolloClient}>
        <UserProvider>{getLayout(<Component {...pageProps} />)}</UserProvider>
      </ApolloProvider>
      {IS_PRODUCTION && (
        <>
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-6Z06JJML9S"
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-6Z06JJML9S');
            `}
          </Script>
        </>
      )}
    </SessionProvider>
  );
};

export default App;
