import Head from 'next/head'
import styles from '../styles/layout.module.css'

export default function Layout({ children }) {
  return (
    <>
    <Head>
        <title>JB - a micro blog</title>
        <meta name="description" content="A micro blog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>{children}</main>
    </>
  );
}
