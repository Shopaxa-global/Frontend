import Head from "next/head";

//imports component
import Menu from "../components/compound/Menu";
import { Layout } from "../components/imports";

export default function Home() {
  return (
    <>
      <Head>
        <title>Shopaxa</title>
        <meta name="description" content="Shop globally with ease" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1 maximum-scale=1"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout />
      <Menu />
    </>
  );
}
