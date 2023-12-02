import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";
import { GlobalProvider } from "../context/GlobalContext";

import { CustumCursor } from '../components/imports'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Shopaxa</title>
      </Head>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/Flip.min.js" />
      <GlobalProvider>
        <CustumCursor />
        <Component {...pageProps} />
      </GlobalProvider>
    </>
  );
}
