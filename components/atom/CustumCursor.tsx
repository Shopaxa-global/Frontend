"use client";

import React from "react";
import { gsap } from "../../lib/gsap";
import { useIsomorphicLayoutEffect } from "../../hooks";
import style from "./styles/CustomCursor.module.scss";

import { useRouter } from "next/router";

const Index = () => {
  const { pathname } = useRouter();

  useIsomorphicLayoutEffect(() => {
    const cursor: HTMLElement = document.querySelector(
      ".custom-cursor-selector"
    ) as HTMLElement;
    const cursorText: HTMLElement = document.querySelector(
      ".cursor-text"
    ) as HTMLElement;

    const navLink = document.querySelectorAll(".nav-link");

    const mailLinkHover = document.querySelectorAll(".cursor-mail-hover");

    const onMouseEnterLink = (e: any) => {
      gsap.to(cursor, { scale: 1, duration: 0.8, borderWidth: "0.5px" });
    };

    const onMouseLeaveLink = (e: any) => {
      gsap.to(cursor, { scale: 1, borderWidth: "1px" });
    };

    const onMouseMove = (e: any) => {
      const { clientX, clientY } = e;
      gsap.to(cursor, {
        x: clientX,
        y: clientY,
        ease: "power4.out",
        delay: 0.1,
      });
    };

    document.addEventListener("mousemove", onMouseMove);

    navLink.forEach((el: any) => {
      el.addEventListener("mouseenter", onMouseEnterLink);
      el.addEventListener("mouseleave", onMouseLeaveLink);
    });
  }, [pathname]);

  //if (isMobile) return null;

  //if(isLoading === 'true') return null;

  return (
    <div
      id="custom-cursor"
      className={`${style.customcursor} custom-cursor-selector`}
    >
      <span className="cursor-text text-center"></span>
    </div>
  );
};

export default Index;
