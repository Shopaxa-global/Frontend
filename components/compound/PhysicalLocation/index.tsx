import React, { useLayoutEffect } from "react";
import { MoreInfo } from "../../molecule";
import styles from "../../../styles/Physicallocation.module.scss";

const Index = () => {
  return (
    <section className={`flex items-end justify-center w-full`}>
      <video
        id="video"
        autoPlay
        loop
        className="w-full md:h-screen h-[90vh] object-cover object-center"
        playsInline
        muted
        onClick={(e) => {
          e.preventDefault();
          if (e.currentTarget.paused) {
            e.currentTarget.play();
          } else {
            e.currentTarget.pause();
          }
        }}
      >
        <source src="/videos/zara-video.mp4" type="video/mp4" />
        <source src="example.webm" type="video/webm" />
        <track kind="captions" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute w-fit mx-auto -translate-y-[20px]">
        <MoreInfo
          buttonId={3}
          headingCustomClass="text-white font-[700] text-[22px] mb-4"
          buttonTitle="DISCOVER MORE"
          heading="SHOP PHYSICAL LOCATIONS"
        />
      </div>
    </section>
  );
};

export default Index;
