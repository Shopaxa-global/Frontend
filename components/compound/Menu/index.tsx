import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useRef, useState } from "react";
import menu_arrow_right from "../../../assets/images/menu_arrow.svg";
import menu_arrow_left from "../../../assets/images/menu_arrow_left.svg";
import { navLinksMobile } from "../../../constants";
import { GlobalContext } from "../../../context/GlobalContext";
import { useIsomorphicLayoutEffect } from "../../../hooks";
import { NavMobileProps } from "../../../interface";
import { gsap } from "../../../lib/gsap";
import { navLinksMobileV2 } from "./constants";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../lib/firebase";

/* interface InnerScreenProps {
  title: string;
  innerLinks?: { link: string; href: string }[];
  href?: string;
} */

const Index = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const { menuOpen, dispatch } = useContext(GlobalContext);
  const tl = useRef<gsap.core.Timeline>();
  const tl2 = useRef<gsap.core.Timeline>();
  const [innerScreenState, setInnerScreenState] = useState<boolean>(false);
  const [innerLinkData, setInnerLinkData] = useState<NavMobileProps>(
    navLinksMobile[0]
  );

  useIsomorphicLayoutEffect(() => {
    // Initial setup
    gsap.set(".menu", {
      opacity: 0,
      display: "none",
      x: "0%",
    });

    gsap.set(".innermenu", {
      opacity: 0,
      display: "none",
      x: "100%",
    });

    // Main menu timeline
    tl.current = gsap.timeline({ paused: true }).to(".menu", {
      display: "flex",
      opacity: 1,
      duration: 0.3,
      ease: "power2.inOut",
    });

    // Inner menu timeline
    tl2.current = gsap
      .timeline({ paused: true })
      .to(".menu", {
        x: "-100%",
        duration: 0.4,
        ease: "power2.inOut",
      })
      .to(
        ".innermenu",
        {
          display: "flex",
          opacity: 1,
          x: 0,
          duration: 0.4,
          ease: "power2.inOut",
        },
        "<"
      );

    // Cleanup
    return () => {
      tl.current?.kill();
      tl2.current?.kill();
    };
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (!tl.current) return;

    if (menuOpen) {
      tl.current.play();
    } else {
      // Reset inner menu state when main menu closes
      setInnerScreenState(false);
      tl2.current?.reverse();
      tl.current.reverse();
    }
  }, [menuOpen]);

  useIsomorphicLayoutEffect(() => {
    if (!tl2.current) return;

    if (innerScreenState) {
      tl2.current.play();
    } else {
      tl2.current.reverse();
    }
  }, [innerScreenState]);

  // Add this new effect to handle route changes
  useIsomorphicLayoutEffect(() => {
    const handleRouteChange = () => {
      dispatch({ type: "SET_MENU_OPEN", payload: false });
    };

    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router]);

  const handleSwitchMenuScreen = (params?: NavMobileProps) => {
    setInnerScreenState((prev) => !prev);
    params && setInnerLinkData(params);
  };

  return (
    <>
      <div className="menu flex-col font-HM-Sans hidden fixed opacity-0 w-screen z-20 bg-[#fff] h-[95.4vh] top-[41px] left-0">
        <div className="flex flex-col w-full relative top-[40px]">
          {navLinksMobile.map((outerlink, index) => (
            <p
              key={index}
              className={`flex justify-between items-center py-6 px-[15px] font-HM-Sans border-b border-b-[#0E0C22] ${
                index === 0 && "h-fit"
              } `}
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

        <div className="relative top-[88px] px-[15px]">
          <ul className="flex flex-col gap-3">
            {navLinksMobileV2.map((link, index) => (
              <li
                key={index}
                className={`text-[12px] relative
              ${link.title == "LOGIN" && user ? "hidden" : ""}
                  ${link.title == "PROFILE" && !user ? "hidden" : ""}
              `}
              >
                <Link href={link.href}>{link.title}</Link>
              </li>
            ))}
          </ul>
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
  const router = useRouter();
  const [innerLinkState, setInnerLinkState] = useState<any[]>([]);

  useIsomorphicLayoutEffect(() => {
    props.subLinks?.forEach((el, index) => {
      setInnerLinkState((prev: any) => [
        ...prev,
        { name: el.title, state: false },
      ]);
    });
  }, [props.innerScreenState]);

  const handleInnerLinkDropToggle = (
    title: string,
    classSelector: string,
    arrowSelector: string
  ) => {
    const findState = innerLinkState.find((el: any) => el.name === title);

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
        duration: 0.2,
      });

      gsap.to(arrowSelector, {
        rotate: 90,
        duration: 0.2,
      });
    } else {
      gsap.to(`.${classSelector}`, {
        height: "auto",
        opacity: 1,
        duration: 0.2,
      });
      gsap.to(arrowSelector, {
        rotate: 270,
        duration: 0.2,
      });
    }
    setInnerLinkState(newState);
  };

  return (
    <div className="innermenu font-HM-Sans hidden flex-col fixed overflow-y-scroll opacity-0 w-screen z-20 bg-[#fff] h-full top-[41px] left-0 bottom-0">
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
                handleInnerLinkDropToggle(
                  sublink?.title,
                  `innerlink-${index}`,
                  `.innerlink-arrow-${index}`
                )
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
