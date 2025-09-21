"use client";

import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import visa from "../../assets/images/visa.png";

gsap.registerPlugin(Draggable);

type Props = {};

const CheckoutSlider = (props: Props) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const items = slider.querySelectorAll(".item");
    const totalWidth = Array.from(items).reduce(
      (acc, item) => acc + (item as HTMLElement).offsetWidth,
      0
    );

    // Make the slider draggable
    Draggable.create(slider, {
      type: "x",
      bounds: { minX: -totalWidth + slider.offsetWidth, maxX: 0 },
      inertia: true,
    });
  }, []);
  return (
    <section
      className="w-full mt-10 border border-[#0E0C2280] pt-6 pb-16 overflow-hidden"
      aria-labelledby="items-title"
    >
      <div
        ref={sliderRef}
        className="flex gap-6 px-4 cursor-grab active:cursor-grabbing w-full"
      >
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="item w-[200px] h-[250px] flex items-center justify-center border border-gray-200"
          >
            <Image src={visa} alt="Jeans" className="max-h-full" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default CheckoutSlider;
