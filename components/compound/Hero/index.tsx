import React from "react";
import Image from "next/image";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import hero1 from "../../../assets/images/home1.webp";
import styles from "../../../styles/Hero.module.scss";
import { PrimaryButton, MoreInfo } from "../../molecule";

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
  return (
    <section className={`h-[calc(100vh-120px)] top-[80px] relative  flex items-end w-full`}>
      <Carousel
        autoPlay
        infiniteLoop
        showArrows={false}
        showStatus={false}
        interval={3500}
        showIndicators={false}
        showThumbs={false}
        stopOnHover={false}
        emulateTouch
        swipeable
        className="w-full h-[calc(100vh-120px)] relative "
      >
        {slider_images.map((image, index) => (
          <Image key={index} src={image} alt="" className="carousel-images h-[calc(100vh-120px)] object-cover" />
        ))}
      </Carousel>

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
