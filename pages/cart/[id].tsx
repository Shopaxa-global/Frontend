import Head from "next/head";
import Menu from "../../components/compound/Menu";

import { CartLayout } from "../../components/imports";

export default function Home() {
  return (
    <>
      <Head>
        <title>Cart | Shopaxa</title>
        <meta name="description" content="Cart" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1 maximum-scale=1"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Menu />
      <CartLayout />
    </>
  );
}
