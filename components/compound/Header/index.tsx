import Image from "next/image";
import React, { useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../lib/firebase";
import { HoverNavLink } from "..";
import bookmarkIcon from "../../../assets/images/bookmark.svg";
import logo from "../../../assets/images/logo.svg";
import { navLinks } from "../../../constants";
import { handleSetNavHoverType } from "../../../context/action";
import { useLocation } from "../../../context/LocationContext";
import {
  useGetValueFromContext,
  useIpadHook,
  useIsomorphicLayoutEffect,
} from "../../../hooks";
import { gsap, ScrollTrigger } from "../../../lib/gsap";
import { NavHoverType } from "../../../types";
import Hambuger from "../../atom/Hambuger";
import Links from "../../atom/Links";
import NavSearchbar from "../../molecule/NavSearchbar";
import TextMarquee from "../../molecule/TextMarquee";
import { useRouter } from "next/router";

type HeaderType = {
  includeMarquee?: boolean;
};

const Index: React.FC<HeaderType> = ({ includeMarquee = true }) => {
  const [user] = useAuthState(auth);

  const [linkHover, setLinkHover] = useState<boolean>(false);
  const router = useRouter();
  let tl: any = useRef(null);

  const { isMobile } = useIpadHook();
  const { scrollDirection, dispatch, navHoverType } = useGetValueFromContext();

  const { location, fetchLocation } = useLocation();

  React.useEffect(() => {
    fetchLocation();
  }, [fetchLocation]);

  useIsomorphicLayoutEffect(() => {
    tl.current = gsap.timeline({});
    const tl2 = gsap.timeline({ delay: 0 });

    ScrollTrigger.create({
      trigger: ".body",
      start: "top+=41% top+=50%",
      //end: "bottom 50%+=100px",

      onUpdate: (self) => {
        if (self.direction === 1) {
          gsap.to(".searchbar", {
            translateY: "-42px",
            display: "none",
            duration: 0.3,
            delay: 0.1,
          });
        } else {
          gsap.to(".searchbar", {
            translateY: "0",
            duration: 0.3,
            display: "flex",
            delay: 0.1,
          });
          //tl?.current?.reverse();
        }
      },
    });

    if (scrollDirection === "down") {
      tl2.to(".textmarquee", {
        translateY: "-400px",
        display: "none",
        duration: 0.3,
        scrollTrigger: {
          trigger: ".body",
          start: "top top",
        },
      });
    } else {
      tl2.to(".textmarquee", {
        translateY: "0",
        display: "flex",
        opacity: 1,
        duration: 0.3,
      });
    }
  }, [scrollDirection]);

  const returnDimNotHoverNav = (hoveredCondition: boolean) => {
    if (linkHover) {
      if (hoveredCondition) {
        return "text-[#bcbcbc]";
      }
      return "text-black-100";
    }
    return "text-black-100";
  };

  return (
    <nav className="w-full z-[23]">
      <section className="flex fixed top-0 left-0 w-full z-[23] justify-between items-center px-2.5 border-b border-[#000] bg-[#fff] h-10">
        <Hambuger />
        <div>
          <ul className="lg:flex hidden items-center gap-[28px]">
            {navLinks.slice(0, 3).map((link, index) => (
              <li
                key={index}
                className={`dropdown py-3`}
                onMouseOver={() => {
                  handleSetNavHoverType(
                    link?.hoverType as NavHoverType,
                    dispatch
                  );
                  setLinkHover(true);
                }}
                onMouseLeave={() => {
                  handleSetNavHoverType(
                    null as unknown as NavHoverType,
                    dispatch
                  );
                  setLinkHover(false);
                }}
              >
                <p className="overflow-hidden">
                  <Links
                    {...link}
                    customClass={returnDimNotHoverNav(
                      link.hoverType !== navHoverType
                    )}
                    key={index}
                  />{" "}
                </p>
                <HoverNavLink />
              </li>
            ))}
          </ul>
        </div>

        <Image
          src={logo}
          alt="shopaxa logo"
          className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] scale-[0.8] cursor-pointer"
          onClick={() => router.push("/")}
        />
        <div className="flex items-center gap-[28px]">
          <p className="cursor-pointer lg:block hidden relative top-[3px] ">
            {location ? (
              <Image
                src={location.country_flag}
                alt={`a flag of ${location.country}`}
                width={12}
                height={12}
              />
            ) : null}
          </p>
          {navLinks.slice(3, navLinks.length).map((link, index) =>
            isMobile ? (
              link.id !== 7 ? null : (
                <p
                  key={index}
                  className="overflow-hidden"
                  onMouseOver={() => {
                    handleSetNavHoverType(
                      link?.hoverType as NavHoverType,
                      dispatch
                    );
                    setLinkHover(true);
                  }}
                  onMouseLeave={() => {
                    handleSetNavHoverType(
                      null as unknown as NavHoverType,
                      dispatch
                    );
                    setLinkHover(false);
                  }}
                  onClick={() => {
                    if (link.isLogin) {
                      router.push("/auth/login");
                    }
                  }}
                >
                  <Links
                    {...link}
                    customClass={returnDimNotHoverNav(
                      link.hoverType !== navHoverType
                    )}
                  />
                </p>
              )
            ) : (
              <p
                key={index}
                className={`overflow-hidden 
                  ${link.isLogin && user ? "hidden" : ""}
                  ${link.isProfile && !user ? "hidden" : ""}`}
                onMouseOver={() => {
                  if (link.isLogin || link.isProfile) {
                    return;
                  }
                  handleSetNavHoverType(
                    link?.hoverType as NavHoverType,
                    dispatch
                  );
                  setLinkHover(true);
                }}
                onMouseLeave={() => {
                  handleSetNavHoverType(
                    null as unknown as NavHoverType,
                    dispatch
                  );
                  setLinkHover(false);
                }}
                onClick={() => {
                  if (link.isLogin) {
                    router.push("/auth/login");
                  }
                  if (link.isProfile && user) {
                    router.push("/dashboard");
                  }
                }}
              >
                <Links
                  {...link}
                  customClass={`${returnDimNotHoverNav(
                    link.hoverType !== navHoverType
                  )}  `}
                />
              </p>
            )
          )}
          <Image
            src={bookmarkIcon}
            alt="bookmark icon"
            className="lg:block hidden relative top-[2px]"
          />
        </div>
      </section>

      {router.pathname !== "/auth/login" &&
        router.pathname !== "/auth/register" &&
        router.pathname !== "/dashboard" &&
        router.pathname !== "/dashboard/profile" &&
        
        (
          <>
            <NavSearchbar />
            {includeMarquee ? <TextMarquee /> : null}
          </>
        )}
    </nav>
  );
};

export default Index;
