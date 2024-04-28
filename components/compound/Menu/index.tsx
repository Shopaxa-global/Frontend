import React, { useContext, useState, useRef, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, TimelineLite } from "../../../lib/gsap";
import { GlobalContext } from "../../../context/GlobalContext";
import { useIsomorphicLayoutEffect } from "../../../hooks";
import { navLinksMobile } from "../../../constants";
import menu_arrow_right from "../../../assets/images/menu_arrow.svg";
import menu_arrow_left from "../../../assets/images/menu_arrow_left.svg";
import arrow_down from "../../../assets/images/footer_pointer.svg";
import { NavMobileProps } from "../../../interface";
import { useRouter } from "next/router";


/* interface InnerScreenProps {
  title: string;
  innerLinks?: { link: string; href: string }[];
  href?: string;
} */

const Index = () => {
  const { menuOpen } = useContext(GlobalContext);
  const tl: any = useRef();
  const tl2: any = useRef();
  const [innerScreenState, setInnerScreenState] = useState<boolean>(false);
  const [innerLinkData, setInnerLinkData] = useState<NavMobileProps>(
    navLinksMobile[0]
  );

  useIsomorphicLayoutEffect(() => {
    gsap.set(".innermenu", {
      x: "100%",
    });

    tl.current = gsap.timeline({ paused: true });
    tl2.current = gsap.timeline({ paused: true });
    tl.current.to(
      ".menu",
      {
        opacity: 1,
        display: "flex",
        duration: 0,
      },
      0
    );
    tl.current.to(
      ".innermenu",
      {
        opacity: 1,
        display: "flex",
        duration: 0.1,
      },
      0
    );

    tl2.current.to(
      ".menu",
      {
        x: "-100%",

        duration: 0.4,
        ease: "power2.inOut",
      },
      0
    );
    tl2.current.to(
      ".innermenu",
      {
        x: 0,
        duration: 0.4,
        ease: "power2.inOut",
      },
      0
    );
  }, []);

  useIsomorphicLayoutEffect(() => {
    menuOpen ? tl.current.play() : tl.current.reverse();
  }, [menuOpen]);

  useIsomorphicLayoutEffect(() => {
    innerScreenState ? tl2.current.play() : tl2.current.reverse();
  }, [innerScreenState]);

  const handleSwitchMenuScreen = (params?: NavMobileProps) => {
    //innerScreenState
    setInnerScreenState((prev) => !prev);
    params && setInnerLinkData(params);
  };

  return (
    <>
      <div className="menu font-HM-Sans hidden fixed opacity-0 w-screen z-20 bg-[#fff] h-[95.4vh] top-[4.5vh] left-0">
        <div className="flex flex-col w-full relative top-[40px]">
          {navLinksMobile.map((outerlink, index) => (
            <p
              key={index}
              className={`flex justify-between items-center py-6 px-[15px] border-b border-b-[#0E0C22]`}
              onClick={() =>
                outerlink.subLinks &&
                handleSwitchMenuScreen(outerlink as NavMobileProps)
              }
            >
              <span className="text-[12px] text-[#0E0C22]">
                {outerlink.title}
              </span>
              <Image
                src={menu_arrow_right}
                className={`${outerlink?.subLinks ? "block" : "hidden"}`}
                alt="menu arrow"
              />
            </p>
          ))}
        </div>
      </div>
      <InnerScreen
        {...innerLinkData}
        handleSwitchMenuScreen={handleSwitchMenuScreen}
        innerScreenState={innerScreenState}
      />
    </>
  );
};

export default Index;






const InnerScreen = (
  props: NavMobileProps & {
    handleSwitchMenuScreen(arg0?: NavMobileProps): ReturnType<() => void>;
    innerScreenState: boolean;
  }
) => {
  const router = useRouter()
  const [innerLinkState, setInnerLinkState] = useState<any[]>([]);

  useIsomorphicLayoutEffect(() => {
    props.subLinks?.forEach((el, index) => {
      setInnerLinkState((prev: any) => [
        ...prev,
        { name: el.title, state: false },
      ]);
    });
  }, [props.innerScreenState]);

  const handleInnerLinkDropToggle = (title: string, classSelector: string, arrowSelector: string) => {
    const findState = innerLinkState.find((el: any) => el.name === title);
    const arrow_selector = `.${classSelector} .arrow-menu`;

    let newState = innerLinkState.map((el: any) => {
      if (el.name === title) {
        return { ...el, state: !el.state };
      }
      return el;
    });

    if (findState?.state) {
      gsap.to(`.${classSelector}`, {
        height: 0,
        opacity: 0,
        duration: 0.5,
      });

      gsap.to(arrowSelector, {
        rotate: 90,
        duration: 0.5,
      })
    } else {
      gsap.to(`.${classSelector}`, {
        height: "auto",
        opacity: 1,
        duration: 0.5,
      });
      gsap.to(arrowSelector, {
        rotate: 270,
        duration: 0.5,
      })
    }    
    setInnerLinkState(newState);
  };

  return (
    <div className="innermenu font-HM-Sans hidden flex-col fixed overflow-y-scroll opacity-0 w-screen z-20 bg-[#fff] h-full top-[4.5vh] left-0 bottom-0">
      <p
        className={`w-full h-fit grid grid-cols-3 py-6 px-[15px] border-b border-b-[#0E0C22] relative top-[40px]`}
        onClick={() => props.handleSwitchMenuScreen()}
      >
        <Image
          src={menu_arrow_left}
          className={`block col-span-1`}
          alt="menu arrow"
        />
        <span className="text-[12px] text-[#0E0C22] col-span-1">
          {props.title}
        </span>
      </p>
      <div className="relative top-[40px]">
        {props.subLinks?.map((sublink, index) => (
          <div key={index} className="border-b border-b-[#0E0C22]">
            <div
              className="flex justify-between items-center py-6 px-[15px] text-[12px] text-[#0E0C22]"
              onClick={() =>
                handleInnerLinkDropToggle(sublink?.title, `innerlink-${index}`, `.innerlink-arrow-${index}`)
              }
            >
              <span>{sublink.title}</span>
              <Image
                src={menu_arrow_right}
                className={`${
                  sublink?.innerLinks ? "block" : "hidden"
                } rotate-90 innerlink-arrow-${index} `}
                alt="menu arrow"
              />
            </div>
            <ul
              className={`${
                sublink.innerLinks ? "flex" : "hidden"
              } gap-[21px] flex-col relative h-0 opacity-0 innerlink-${index}`}
            >
              {sublink.innerLinks?.map((innerlink, innerindex) => (
                <Link
                  href={innerlink.href}
                  key={innerindex}
                  className="text-[12px] flex justify-between items-center px-[15px] relative last:mb-[21px]"
                >
                  {innerlink.link}
                </Link>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};
