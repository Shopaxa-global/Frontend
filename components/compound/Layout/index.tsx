import React from "react";
import Header from "../Header";
import Hero from "../Hero";
import ShopCart from "../ShopCart";
import ShoppingLocation from "../ShoppingLocation";
import PhysicalLocation from "../PhysicalLocation";
import Footer from "../Footer";

import { useIsomorphicLayoutEffect } from "../../../hooks";
import { ScrollTrigger } from "../../../lib/gsap";
import { handleSetScrollDirection } from "../../../context/action";
import { useGetValueFromContext } from "../../../hooks";

const Index = () => {
  const { dispatch } = useGetValueFromContext();

  useIsomorphicLayoutEffect(() => {
    function initScrollDirectionIndicator() {
      const body = document.querySelector(".body");

      ScrollTrigger.create({
        markers: false,
        trigger: body,
        start: "top -20%",
        onUpdate: (self) => {
          if (self.direction === 1) {
            handleSetScrollDirection("down", dispatch);
          } else {
            handleSetScrollDirection("up", dispatch);
          }
        },
      });
    }

    /*-------------------------------
        Init
        -------------------------------*/

    window.addEventListener("load", initScrollDirectionIndicator);

    return () => {
      window.removeEventListener("load", initScrollDirectionIndicator);
    };
  }, []);
  return (
    <main className="body z-[15]">
      
      <Header />
      <Hero />
      <ShopCart />
      <ShoppingLocation />
      <PhysicalLocation />
      <Footer />
    </main>
  );
};

export default Index;
