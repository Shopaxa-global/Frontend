import type { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";
import { CartProvider } from "../context/CartContext";
import { GlobalProvider } from "../context/GlobalContext";
import { AuthProvider } from "../context/AuthContext";
import { LocationProvider } from "../context/LocationContext";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Shopaxa</title>
      </Head>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/Flip.min.js" />
      <GlobalProvider>
        {/* <CustumCursor /> */}
        <AuthProvider>
          <LocationProvider>
            <CartProvider>
              <Component {...pageProps} />
            </CartProvider>
          </LocationProvider>
        </AuthProvider>
      </GlobalProvider>
    </>
  );
}
