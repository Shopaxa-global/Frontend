import React, { useContext } from "react";
import { GlobalContext } from "../../../context/GlobalContext";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { useIsomorphicLayoutEffect } from "../../../hooks";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import hero1 from "../../../assets/images/home1.webp";
import { PrimaryButton, MoreInfo } from "../../molecule";

import { gsap, Draggable, CustomEase } from "../../../lib/gsap";
gsap.registerPlugin(Draggable);

import slider_image1 from "../../../assets/images/slider-image1.svg";
import slider_image2 from "../../../assets/images/slider-image2.svg";
import slider_image3 from "../../../assets/images/slider-image3.svg";
import slider_image4 from "../../../assets/images/slider-image4.svg";
import slider_image5 from "../../../assets/images/slider-image5.svg";

const slider_images: any[] = [
  slider_image1,
  slider_image2,
  slider_image3,
  slider_image4,
  slider_image5,
];

const Index = () => {
  const { navHoverType } = useContext(GlobalContext);

  useGSAP(
    () => {
      //if(!!navHoverType) return;

      var slideDelay = 9.5;
        var slideDuration = 2.3;
        var wrap = true;

        var slides: any = document.querySelectorAll(".car-item");
        var progressWrap = gsap.utils.wrap(0, 1);

        var numSlides = slides.length;

        gsap.set(slides, {
          xPercent: (i) => i * 100,
        });

        const animateSlides = (direction: any) => {
          timer.restart(true);
          slideAnimation.kill();
          var x = snapX(
            (gsap.getProperty(proxy, "x") as any) + direction * slideWidth
          );

          slideAnimation = gsap.to(proxy, {
            x: x,
            duration: slideDuration,
            onUpdate: updateProgress,
            ease: "power4.inOut",
          });
        };

        const autoPlay = () => {
          animateSlides(-1);
        };

        const updateProgress = () => {
          animation.progress(
            progressWrap((gsap.getProperty(proxy, "x") as any) / wrapWidth)
          );
        };

        const snapX = (value: any) => {
          let snapped = gsap.utils.snap(slideWidth, value);
          return wrap
            ? snapped
            : gsap.utils.clamp(-slideWidth * (numSlides - 1), 0, snapped);
        };

        const resize = () => {
          var norm = (gsap.getProperty(proxy, "x") as any) / wrapWidth || 0;

          slideWidth = slides[0]?.offsetWidth;
          wrapWidth = slideWidth * numSlides;

          /* wrap ||
          draggable.applyBounds({ minX: -slideWidth * (numSlides - 1), maxX: 0 }); */

          gsap.set(proxy, {
            x: norm * wrapWidth,
          });

          animateSlides(0);
          slideAnimation.progress(1);
        };

        var wrapX = gsap.utils.wrap(-100, (numSlides - 1) * 100);
        var timer = gsap.delayedCall(slideDelay, autoPlay);

        var animation = gsap.to(slides, {
          xPercent: "+=" + numSlides * 100,
          duration: 1,
          ease: "none",
          paused: true,
          repeat: -1,
          modifiers: {
            xPercent: wrapX,
          },
        });

        var proxy = document.createElement("div");
        var slideAnimation = gsap.to({}, {});
        var slideWidth = 0;
        var wrapWidth = 0;

        resize();

        window.addEventListener("resize", resize);
    },[]);

  return (
    <section
      className={`h-[calc(100vh-120px)] overflow-hidden top-[80px] relative  flex items-end w-full car-cnt`}
    >
      {/* <Carousel
        autoPlay
        animationHandler={"fade"}
        infiniteLoop
        showArrows={false}
        showStatus={false}
        interval={8500}
        dynamicHeight={false}
        showIndicators={false}
        showThumbs={false}
        stopOnHover={false}
        emulateTouch
        swipeable={false}
        className="w-full h-full relative "
      >
        {slider_images.map((image, index) => (
          <Image key={index} src={image} alt="" className="carousel-images h-[calc(100vh-120px)] object-cover" />
        ))}
      </Carousel> */}

      {slider_images.map((image, index) => (
        <Image
          key={index}
          src={image}
          alt=""
          className="carousel-images w-screen h-[calc(100vh-120px)] object-cover car-item absolute top-0 left-0"
        />
      ))}

      <div className="absolute w-full mx-auto -translate-y-[20px] left-1/2 -translate-x-1/2 ">
        <MoreInfo
          buttonId={1}
          headingCustomClass="text-white font-[700] text-[22px] mb-4"
          buttonTitle="DOWNLOAD EXTENSION"
          heading="STRAIGHT INTO AFRICA"
        />
      </div>
    </section>
  );
};

export default Index;
