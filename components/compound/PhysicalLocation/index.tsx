import React from "react";
import { MoreInfo } from "../../molecule";
import styles from "../../../styles/Physicallocation.module.scss";

const index = () => {
  return (
    <section className={`${styles.physical_hero} flex items-end w-full`}>
      <MoreInfo
        buttonId={3}
        headingCustomClass="text-white font-[700] text-[22px] mb-4"
        buttonTitle="DISCOVER MORE"
        heading="SHOP PHYSICAL LOCATIONS"
      />
    </section>
  );
};

export default index;
