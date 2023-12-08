import React from "react";
import { useIsomorphicLayoutEffect } from "../../../hooks";
import { Gallery } from "../../molecule";
import { Heading2, PrimaryText, SecondaryLink } from "../../atom";
import { shoppingLocation } from "../../../constants";

const index = () => {
  return (
    <section className="flex large:flex-row flex-col-reverse justify-between items-center md:px-[99px] px-[15px] md:py-[75px] py-[46px]">
      <div className="large:mt-0 mt-[31px]">
        <Heading2
          title="SHOPPING LOCATION IS SIMPLE"
          customClass="max-w-[434px]"
        />

        <div className="md:mt-[82px] mt-[27px] flex flex-col md:gap-20 gap-10">
          {shoppingLocation.map((item, index) => (
            <div
              key={index}
              className="flex md:flex-row flex-col justify-between xl:gap-[170px] md:gap-[70px] gap-[11px]"
            >
              <PrimaryText title={item.title} customClass="" />
              <PrimaryText
                title={item.description}
                customClass="max-w-[363px]"
              />
            </div>
          ))}
        </div>
        <SecondaryLink id={1} link="#" title="Discover more" customClass=""  />
      </div>
      <Gallery />
    </section>
  );
};

export default index;
