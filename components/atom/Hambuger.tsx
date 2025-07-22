import React, { useContext, useRef } from "react";
import { gsap, TimelineLite } from "../../lib/gsap";
import { useIsomorphicLayoutEffect } from "../../hooks";
import { handleSetMenuOpen } from "../../context/action";
import { GlobalContext } from "../../context/GlobalContext";
import { useRouter } from "next/navigation";

const Hambuger = () => {
  const { menuOpen, dispatch } = useContext(GlobalContext);
  const router = useRouter();
  const timelineRef = useRef<TimelineLite | null>(null);

  useIsomorphicLayoutEffect(() => {
    const upper = document.getElementsByClassName("upper")[0];
    const middle = document.getElementsByClassName("middle")[0];
    const lower = document.getElementsByClassName("lower")[0];

    timelineRef.current = new TimelineLite({ paused: true, reversed: true });

    timelineRef.current
      .to(
        upper,
        0.5,
        { attr: { d: "M8,2 L2,8" }, x: 1, ease: "power2.inOut" },
        "start"
      )
      .to(middle, 0.5, { autoAlpha: 0 }, "start")
      .to(
        lower,
        0.5,
        { attr: { d: "M8,8 L2,2" }, x: 1, ease: "power2.inOut" },
        "start"
      );

    // Cleanup function
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, []);

  const handleClick = () => {
    if (timelineRef.current) {
      timelineRef.current.reversed()
        ? timelineRef.current.play()
        : timelineRef.current.reverse();
    }
    handleSetMenuOpen(!menuOpen, dispatch);
  };

  // Reset hamburger when menuOpen changes to false
  useIsomorphicLayoutEffect(() => {
    if (!menuOpen && timelineRef.current && !timelineRef.current.reversed()) {
      timelineRef.current.reverse();
    }
  }, [menuOpen]);

  return (
    <svg
      viewBox="0 0 12 10"
      className="hamburger lg:hidden flex cursor-pointer"
      height="20px"
      width="29px"
      onClick={handleClick}
    >
      <path
        d="M10,2 L2,2"
        className="upper w-full"
        style={{
          fill: "none",
          stroke: "#000",
          strokeLinecap: "round",
          strokeWidth: "0.6",
        }}
      />
      <path
        d="M2,5 L10,5"
        className="middle w-full"
        style={{
          fill: "none",
          stroke: "#000",
          strokeLinecap: "round",
          strokeWidth: "0.6",
        }}
      />
      <path
        d="M10,8 L2,8"
        className="lower w-full"
        style={{
          fill: "none",
          stroke: "#000",
          strokeLinecap: "round",
          strokeWidth: "0.6",
        }}
      />
    </svg>
  );
};

export default Hambuger;

{
  /* <svg
  width="18"
  height="2"
  viewBox="0 0 18 2"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path d="M18 0H0V1.45161H9H18V0Z" fill="black" />
</svg>; */
}
