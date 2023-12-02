import React from "react";
import Image from "next/image";
import logo from "../../../assets/images/logo.svg";
import bookmarkIcon from "../../../assets/images/bookmark.svg";
import { navLinks } from "../../../constants";
import Links from "../../atom/Links";
import NavSearchbar from "../../molecule/NavSearchbar";
import Hambuger from "../../atom/Hambuger";
import { useIpadHook } from "../../../hooks";

const Index = () => {
  const { isMobile } = useIpadHook();

  return (
    <nav className="w-full">
      <section className="flex justify-between items-center px-2.5 relative border-b border-[#000] h-[40px]">
        <Hambuger />
        <div className="lg:flex hidden items-center gap-[8px]">
          {navLinks.slice(0, 4).map((link, index) => (
            <Links {...link} key={index} />
          ))}
        </div>
        <Image
          src={logo}
          alt="shopaxa logo"
          className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] scale-[0.8]"
        />
        <div className="flex items-center gap-[8px]">
          {navLinks
            .slice(4, navLinks.length)
            .map((link, index) =>
              isMobile ? (
                link.id !== 7 ? null : (
                  <Links {...link} key={index} />
                )
              ) : (
                <Links {...link} key={index} />
              )
            )}
          <Image
            src={bookmarkIcon}
            alt="bookmark icon"
            className="lg:block hidden"
          />
        </div>
      </section>
      <NavSearchbar />
    </nav>
  );
};

export default Index;
