import React from "react";
import { useIsomorphicLayoutEffect } from "../../hooks";
import Image from "next/image";
import { gsap } from "../../lib/gsap";
import img1 from "../../assets/images/gallery/gallery1.webp";
import img2 from "../../assets/images/gallery/gallery2.webp";
import img3 from "../../assets/images/gallery/gallery3.webp";
import img4 from "../../assets/images/gallery/gallery4.webp";

const Gallery = () => {
  useIsomorphicLayoutEffect(() => {
    let smallImage = gsap.utils.toArray(".smallImg");

    let cnt = document.querySelector(".cnt");

    //Reference for a future animation

    /* smallImage.forEach((image: any, index) => {
      gsap.set(image, { scale: 0.8 })
      gsap.to(image, {
        scrollTrigger: {
          trigger: image,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: true,
          markers: false,
        },
        scale: 1,
        duration: 0.5,
        ease: 'power2.inOut'
      })
    }) */

    const onMouseEnter = (index: number) => {
      //tl.play(0);
      switch (index) {
        case 0:
          gsap.to(".mainImg1", {
            opacity: 1,
            duration: 1.4,
          });
          gsap.to([".smallImg", ".mainImg2", ".mainImg3", ".mainImg4"], {
            opacity: 0,
            duration: 1.4,
          });

          break;
        case 1:
          gsap.to(".mainImg2", {
            opacity: 1,
            duration: 1.4,
          });
          gsap.to([".smallImg", ".mainImg1", ".mainImg3", ".mainImg4"], {
            opacity: 0,
            duration: 1.4,
          });

          break;
        case 2:
          gsap.to(".mainImg3", {
            opacity: 1,
            duration: 1.4,
          });
          gsap.to([".smallImg", ".mainImg2", ".mainImg1", ".mainImg4"], {
            opacity: 0,
            duration: 1.4,
          });

          break;
        case 3:
          gsap.to(".mainImg4", {
            opacity: 1,
            duration: 1.4,
          });
          gsap.to([".smallImg", ".mainImg2", ".mainImg3", ".mainImg1"], {
            opacity: 0,
            duration: 1.4,
          });

          break;
        default:
          break;
      }
    };
    const onMouseLeave = (index: number) => {
      switch (index) {
      }
      gsap.to([".mainImg1", ".mainImg2", ".mainImg3", ".mainImg4"], {
        opacity: 0,
        duration: 0.9,
      });
      gsap.to(".smallImg", {
        opacity: 1,
        duration: 0.9,
      });
    };

    smallImage.forEach((image: any, index: number) => {
      image?.addEventListener("mouseenter", () => onMouseEnter(index));

      cnt?.addEventListener("mouseleave", () => onMouseLeave(index));
    });
  }, []);

  return (
    <div className="grid grid-cols-2 grid-rows-2 sm:w-9/12 md:w-7/12 large:max-w-[596px] relative cnt">
      <Image src={img1} alt="gallery image 1" className="smallImg z-[7]" />
      <Image src={img2} alt="gallery image 2" className="smallImg z-[7]" />
      <Image src={img3} alt="gallery image 3" className="smallImg z-[7]" />
      <Image src={img4} alt="gallery image 4" className="smallImg z-[7]" />

      <Image src={img1} alt="" className=" opacity-0 mainImg1 absolute" />
      <Image src={img2} alt="" className=" opacity-0 mainImg2 absolute" />
      <Image src={img3} alt="" className=" opacity-0 mainImg3 absolute" />
      <Image src={img4} alt="" className=" opacity-0 mainImg4 absolute" />
    </div>
  );
};

export default Gallery;
