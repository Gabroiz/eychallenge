import { AppProps } from 'next/dist/shared/lib/router/router';
import styles from '../styles/app.module.scss';


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={styles.container}>
      <main>
        <Component {...pageProps} />
      </main>
    </div>
  )
}
export default MyApp