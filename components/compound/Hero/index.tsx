import React from "react";
import Image from "next/image";
import hero1 from "../../../assets/images/home1.webp";
import styles from "../../../styles/Hero.module.scss";
import { PrimaryButton, MoreInfo } from "../../molecule";

const Index = () => {
  return (
    <section className={`${styles.hero} flex items-end w-full`}>
    
      <MoreInfo buttonId={1} headingCustomClass="text-white font-[700] text-[22px] mb-4" buttonTitle="DOWNLOAD EXTENSION" heading="STRAIGHT INTO AFRICA" />
    </section>
  );
};

export default Index;
