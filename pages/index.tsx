import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";

//imports component
import { Layout } from "../components/imports";
import Menu from "../components/compound/Menu";

export default function Home() {
  return (
    <>
      <Head>
        <title>Shopaxa</title>
        <meta name="description" content="Shop globally with ease" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout />
      <Menu />
    </>
  );
}
