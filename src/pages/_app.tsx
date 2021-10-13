import * as React from 'react';
import { AppProps } from 'next/dist/shared/lib/router/router';
import { EmotionCache } from '@emotion/react';
import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';
import Head from 'next/head';
import { AuthProvider } from 'contexts/AuthContext';
import { RouteGuard } from 'Components/RouteGuard';
import "nprogress/nprogress.css";
import nProgress from "nprogress";
import Router from "next/router"


Router.events.on("routeChangeStart", nProgress.start);
Router.events.on("routeChangeError", nProgress.done);
Router.events.on("routeChangeComplete", nProgress.done);

/* const TopProgressBar = dynamic(
  () => {
    return import("components/nprogress/TopProgressBar");
  },
  { ssr: false },
);
 */
type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type MyAppProps = AppProps & {
  Component: NextPageWithLayout
  emotionCache?: EmotionCache;
}

function MyApp(props: MyAppProps) {

  const { Component, pageProps } = props;

  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => <React.Fragment>{page}</React.Fragment>)

  return (
    <AuthProvider>
      <div>
        <main>
          <Head>
            <title>Emplex - EY</title>
            <meta name="viewport" content="initial-scale=1, width=device-width" />
          </Head>
          {/* <RouteGuard> */}
          {getLayout(<Component {...pageProps} />)}
          {/* </RouteGuard> */}
        </main>
      </div>
    </AuthProvider>
  )
}

export default MyApp