import { AppProps } from 'next/dist/shared/lib/router/router';
import styles from '../styles/app.module.scss';

import Layout from 'Components/Layout'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={styles.container}>
      <main>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </main>
    </div>
  )
}

export default MyApp