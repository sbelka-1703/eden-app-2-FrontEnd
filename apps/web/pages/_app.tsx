import "../styles/global.css";

import { ApolloProvider } from "@apollo/client";
import { UserProvider } from "@context/eden";
import { apolloClient } from "@graphql/eden";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import Script from "next/script";
import { SessionProvider } from "next-auth/react";
import type { ReactElement, ReactNode } from "react";
import * as React from "react";

import { IS_DEVELOPMENT, IS_PRODUCTION } from "../constants";
import * as ga from "../lib/ga";

export { reportWebVitals } from "next-axiom";

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
  const router = useRouter();

  React.useEffect(() => {
    const handleRouteChange = (url: any) => {
      ga.pageview(url);
      console.log("url", url);
    };

    //When the component is mounted, subscribe to router changes
    //and log those page views
    router.events.on("routeChangeComplete", handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  console.log(IS_DEVELOPMENT ? "development" : "production");

  return (
    <SessionProvider session={session}>
      <ApolloProvider client={apolloClient}>
        <UserProvider>{getLayout(<Component {...pageProps} />)}</UserProvider>
      </ApolloProvider>

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
    </SessionProvider>
  );
};

export default App;
