import Head from 'next/head'

export default function Layout({ children }) {
  return (
    <>
    <Head>
        <title>phocks microblog</title>
        <meta name="description" content="A micro blog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>{children}</main>
    </>
  );
}