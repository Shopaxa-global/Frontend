import React, { useCallback } from "react";
import Image from "next/image";
import logo from "../../../assets/images/logo.svg";
import bookmarkIcon from "../../../assets/images/bookmark.svg";
import { navLinks } from "../../../constants";
import Links from "../../atom/Links";
import NavSearchbar from "../../molecule/NavSearchbar";
import TextMarquee from "../../molecule/TextMarquee";
import Hambuger from "../../atom/Hambuger";
import {
  useIpadHook,
  useGetValueFromContext,
  useIsomorphicLayoutEffect,
} from "../../../hooks";
import { gsap, ScrollTrigger } from "../../../lib/gsap";

const Index = () => {
  const { isMobile } = useIpadHook();
  const { scrollDirection } = useGetValueFromContext();

  useIsomorphicLayoutEffect(() => {
    const tl = gsap.timeline({});
    const tl2 = gsap.timeline({});

    ScrollTrigger.create({
      trigger: ".body",
      start: "top+=41% top+=50%",
      //end: "bottom 50%+=100px",
      onToggle: (self) => {},
      onUpdate: (self) => {
        if (self.direction === 1) {
          gsap.to(".searchbar", {
            translateY: "-42px",
            display: "none",
            duration: 1,
          });
        } else {
          gsap.to(".searchbar", {
            translateY: "0",
            duration: 1,
            display: "flex",
          });
        }
      },
    });

    if (scrollDirection === "down") {
      tl2.to(".textmarquee", {
        translateY: "-400px",
        display: "none",
        duration: 1,
        scrollTrigger: {
          trigger: ".body",
          start: "top top",
        },
      });
    } else {
      tl2.to(".textmarquee", {
        translateY: "0",
        display: "flex",
        opacity: 1,
        duration: 1,
      });
    }
  }, [scrollDirection]);

  return (
    <nav className="w-full">
      <section className="flex fixed top-0 left-0 w-full z-[10] justify-between items-center px-2.5 border-b border-[#000] bg-[#fff] h-10">
        <Hambuger />
        <div className="lg:flex hidden items-center gap-[28px]">
          {navLinks.slice(0, 4).map((link, index) => (
            <Links {...link} key={index} />
          ))}
        </div>
        <Image
          src={logo}
          alt="shopaxa logo"
          className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] scale-[0.8]"
        />
        <div className="flex items-center gap-[28px]">
          {navLinks
            .slice(4, navLinks.length)
            .map((link, index) =>
              isMobile ? (
                link.id !== 7 ? null : (
                  <Links {...link} key={index} />
                )
              ) : (
                <Links {...link} key={index} />
              )
            )}
          <Image
            src={bookmarkIcon}
            alt="bookmark icon"
            className="lg:block hidden ml-3"
          />
        </div>
      </section>

      <NavSearchbar />
      <TextMarquee />
    </nav>
  );
};

export default Index;
