import React, { useContext } from "react";
import Link from "next/link";
import { GlobalContext } from '../../context/GlobalContext'
import { NavLinkProps } from "../../interface";
import { gsap, SplitType } from "../../lib/gsap";
import { useIsomorphicLayoutEffect } from "../../hooks";
import { handleSetNavHoverType } from "../../context/action"
import { NavHoverType } from '../../types'
import router from "next/router";


const Links = ({ title, link, customClass, id, hoverType, isLogin }: NavLinkProps) => {

  const { dispatch } = useContext(GlobalContext)


  useIsomorphicLayoutEffect(() => {
    const linkTextUpper = new SplitType(`#link-upper-${id}`, {
      types: "words,chars",
    });

    const linkTextLower = new SplitType(`#link-lower-${id}`, {
      types: "words,chars",
    });

    gsap.set(`#link-lower-${id}`, { translateY: "40%" });

    let tl: any;

    const onMouseEnter = () => {
      
      tl = gsap.timeline()

      tl.to(
        linkTextUpper.chars,
        {
          translateY: "-120%",
          stagger: 0.001,
          duration: 0.5,
          delay: 0.1,
          yoyo: true,
        },
        0
      );
      tl.to(
        linkTextLower.chars,

        {
          translateY: "-140%",
          stagger: 0.001,
          duration: 0.5,
          yoyo: true,
          repeatRefresh: true,
        },
        ">-0.5"
      );
    };

    const onMouseLeave = () => {
      //handleSetNavHoverType(null as unknown as NavHoverType, dispatch);
      tl.reverse();
    };

    document
      .getElementById(`link-parent-${id}`)
      ?.addEventListener("mouseenter", onMouseEnter);

    document
      .getElementById(`link-parent-${id}`)
      ?.addEventListener("mouseleave", onMouseLeave);
  }, []);

  return (
    <Link
      className={`font-HM-Sans text-[12px] relative overflow-y-hidden  ${customClass}`}
      id={`link-parent-${id}`}
      href={link}
      onClick={() => {
        if (isLogin) {
          router.push("/auth/login");
        }
      }}
    >
      <span id={`link-upper-${id}`} className="relative">
        {" "}
        {title}
      </span>
      <br />
      <span id={`link-lower-${id}`} className="absolute ">
        {" "}
        {title}
      </span>
      
    </Link>
  );
};

export default Links;
