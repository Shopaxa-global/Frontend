import React, { useState } from "react";
import { gsap, TimelineLite } from "../../../lib/gsap";
import Image from "next/image";
import Link from "next/link";
import { footerLinks } from "../../../constants";
import { FooterColumn } from "../../molecule";
import footer_pointer from "../../../assets/images/footer_pointer.svg";
import { useIpadHook } from "../../../hooks";

const Index = () => {
  const { isMobile } = useIpadHook();
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  let tl: any = gsap.timeline();

  const handleToggleDropDown = (class_uid: string) => {
    if (!isDropDownOpen) {
      tl.to(
        `.arrow-${class_uid}`,
        {
          rotate: 0,
        },
        0
      ).to(
        `.dropdown-${class_uid}`,
        {
          height: "auto",
          opacity: 1,
          duration: 0.6,
          display: "flex",
          ease: "power4.out",
        },
        0
      );
    } else {
      tl?.to(
        `.arrow-${class_uid}`,
        {
          rotate: 180,
        },
        0
      ).to(
        `.dropdown-${class_uid}`,
        {
          height: 0,
          opacity: 0,
          duration: 0.6,
          display: "none",
          ease: "power4.out",
        },
        0
      );
    }
  };

  React.useEffect(() => {
    console.log("isDropDownOpen", isDropDownOpen);
  }, [isDropDownOpen]);

  //console.log('isMobile', isMobile);

  return (
    <footer className="bg-[#00000066] h-full font-HM-Sans overflow-y-hidden z-10">
      <div className="grid lg:grid-cols-6 grid-cols-1  border-b-[1px] border-b-[#000] ">
        <div className="py-5 px-3 lg:h-[275px] lg:border-r-[1px] lg:border-r-[#000] lg:border-b-0 border-b-[1px] border-b-[#000]">
          <p
            className="uppercase text-[#0E0C22] text-[12px] lg:mb-4 flex flex-row justify-between items-center"
            onClick={
              isMobile
                ? () => {
                    handleToggleDropDown("newsletter");
                    setIsDropDownOpen((prev) => !prev);
                  }
                : () => {}
            }
          >
            <span>NEWSLETTER</span>
            <Image
              src={footer_pointer}
              alt="footer_pointer"
              className="lg:hidden block rotate-180 arrow-newsletter"
            />
          </p>
          <div className="h-0 lg:opacity-100 text-[12px] opacity-0 dropdown-newsletter relative lg:top-0 top-3 lg:flex hidden">
            <Link href="#" className="underline mb-4">
              Subscribe to our newsletter
            </Link>
          </div>
        </div>

        {footerLinks.map((link, index) => (
          <FooterColumn
            handleToggleDropDown={handleToggleDropDown}
            setIsDropDownOpen={setIsDropDownOpen}
            key={index}
            data={link}
            index={index}
          />
        ))}

        <div className="py-5 px-3 lg:h-[270px] lg:border-r-[1px] lg:border-r-[#000]  flex flex-col">
          <p
            className="uppercase text-[#0E0C22] text-[12px] lg:mb-8 flex flex-row justify-between items-center"
            onClick={
              isMobile
                ? () => {
                    handleToggleDropDown("contact");
                    setIsDropDownOpen((prev) => !prev);
                  }
                : () => {}
            }
          >
            <span>CONTACT US</span>
            <Image
              src={footer_pointer}
              alt="footer_pointer"
              className="lg:hidden block rotate-180 arrow-contact"
            />
          </p>
          <div className="lg:flex hidden h-0 lg:opacity-100 opacity-0 flex-col dropdown-contact relative lg:top-0 top-5">
            <p className="text-[12px]">CALL US AT</p>
            <Link href="#" className="underline text-[12px] mb-6">
              +234 906 034 7521
            </Link>
            <Link href="#" className="underline text-[12px] lg:mb-0 mb-4">
              SEND US AN EMAIL
            </Link>
          </div>
        </div>
      </div>
      <p className="text-center py-4 leading-3 text-base ">
        <span className="text-[12px]">©</span>{" "}
        <span className="text-[11px]">{new Date().getFullYear()}</span>{" "}
        <span className="text-[12px]">Shopaxa</span>{" "}
      </p>
    </footer>
  );
}

export default Index;
