import React from "react";
import { useIsomorphicLayoutEffect } from "../../hooks";
import Link from "next/link";
import { SecondaryLinkProps } from "../../interface";
import { gsap } from "../../lib/gsap";
import { on } from "events";

const SecondaryLink = ({
  id,
  link,
  title,
  customClass,
}: SecondaryLinkProps) => {
  useIsomorphicLayoutEffect(() => {
    const link = document.querySelector(`.link-${id}`);
    gsap.set(`.link2line${id}`, { left: "-110%" });

    let tl: any;

    const onMouseEnter = () => {
      tl = gsap.timeline();

      tl.to(
        `.linkline${id}`,
        {
          left: "110%",
          duration: 0.5,
          ease: "power2.inOut",
        },
        0
      );
      tl.to(
        `.link2line${id}`,
        {
          left: "0%",
          duration: 0.5,
          ease: "power2.inOut",
        },
        0
      );
    };
    const onMouseLeave = () => {
      tl.reverse();
    };

    link?.addEventListener("mouseenter", onMouseEnter);
    link?.addEventListener("mouseleave", onMouseLeave);

    return () => {
      link?.removeEventListener("mouseenter", onMouseEnter);
      link?.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <div
      className={`w-fit overflow-x-hidden h-[50px] md:mx-0 mx-auto md:mt-[97px] mt-[50px] cursor-pointer link-${id}`}
    >
      <Link
        href={link}
        className={`${customClass} w-fit font-HM-Sans relative`}
      >
        <span className="text-[17px] text-[#000] ">{title}</span>
        <div className="relative w-full">
          <div
            className={`absolute linkline${id} top-2.5 bottom-0 w-full h-[2px] bg-[#000]`}
          />
          <div
            className={`absolute link2line${id} top-2.5 bottom-0 w-full h-[2px] bg-[#000]`}
          />
        </div>
      </Link>
    </div>
  );
};

export default SecondaryLink;
