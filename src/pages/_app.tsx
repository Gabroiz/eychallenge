import { AppProps } from 'next/dist/shared/lib/router/router';
import styles from '../styles/app.module.scss';

import Layout from 'Components/Layout'
import { EmotionCache } from '@emotion/react';
import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';
import Head from 'next/head';

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
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>)

  return (
    <div className={styles.container}>
      <main>
          <Head>
            <title>Emplex - EY</title>
            <meta name="viewport" content="initial-scale=1, width=device-width" />
          </Head>
          {getLayout(<Component {...pageProps} />)}
      </main>
    </div>
  )
}

export default MyApp