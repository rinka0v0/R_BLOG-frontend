import Head from "next/head";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  return (
    <>
    <Head>
      <title>R_BLOG</title>
    </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
