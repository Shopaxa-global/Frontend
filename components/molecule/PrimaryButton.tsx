import React, { useState } from "react";
import { useIsomorphicLayoutEffect } from "../../hooks";
import { ButtonProps } from "../../interface";
import { gsap, SplitType } from "../../lib/gsap";

const Button = ({
  title,
  customClass,
  onClick,
  disabled,
  stroke,
  id,
}: ButtonProps) => {
  useIsomorphicLayoutEffect(() => {
    const parent = document.getElementById(`btn-parent${id}`) as any;
    const childUpper = document.getElementById(`btn-text-upper${id}`) as any;

    gsap.set(`#btn-text-lower${id}`, { translateY: "150%" });

    let tl: any;
    let textIndex = 0;

    const onMouseEnter = () => {
      tl = gsap.timeline({});

      let newSpan = document.createElement("span");
      newSpan.innerHTML = childUpper.innerHTML;
      newSpan.classList.add(`btn-text-${id}`);
      newSpan.classList.add("absolute");
      newSpan.style.transform = "translateY(150%)";

      //let images = gsap.utils.toArray(".btn-text");

      tl.to(`.text-index-${id}-${textIndex}`, {
        duration: 0.3,
        ease: "power4.out",
        y: "-160%",
        onComplete: () => {
          textIndex = textIndex + 1;
          newSpan.classList.add(`text-index-${id}-${textIndex}`);
          parent.appendChild(newSpan);
          tl.to(`.text-index-${id}-${textIndex}`, {
            duration: 0.3,
            ease: "power4.out",
            y: "0%",
          });
        },
      });
    };

    document
      .getElementById(`btn-parent${id}`)
      ?.addEventListener("mouseenter", onMouseEnter);
  }, []);

  return (
    <button
      id={`btn-parent${id}`}
      className={`relative font-HM-Sans text-[12px] px-4 py-[15px] bg-[#fff] ${
        stroke && "border border-[#0E0C22]"
      } text-black-100 h-[44px] flex items-center justify-center rounded-[5px] overflow-hidden btn-parent`}
    >
      <span
        id={`btn-text-upper${id}`}
        className={`relative btn-text${id} text-index-${id}-${0} `}
      >
        {title}
      </span>
    </button>
  );
};

export default Button;
