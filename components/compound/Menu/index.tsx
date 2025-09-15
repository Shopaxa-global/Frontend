import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useContext, useMemo, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import menu_arrow_right from "../../../assets/images/menu_arrow.svg";
import menu_arrow_left from "../../../assets/images/menu_arrow_left.svg";
import { navLinksMobile } from "../../../constants";
import { GlobalContext } from "../../../context/GlobalContext";
import { useIsomorphicLayoutEffect } from "../../../hooks";
import { NavMobileProps } from "../../../interface";
import { auth } from "../../../lib/firebase";
import { gsap } from "../../../lib/gsap";
import { navLinksMobileV2 } from "./constants";

const Menu = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const { menuOpen, dispatch } = useContext(GlobalContext);
  const [isInnerMenuOpen, setIsInnerMenuOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<NavMobileProps | null>(null);
  const [expandedDropdowns, setExpandedDropdowns] = useState<Set<string>>(
    new Set()
  );

  const menuRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline>();

  // Memoize filtered nav links to avoid unnecessary re-renders
  const filteredNavLinks = useMemo(() => {
    return navLinksMobileV2.filter((link) => {
      if (link.title === "LOGIN" && user) return false;
      if (link.title === "PROFILE" && !user) return false;
      return true;
    });
  }, [user]);

  // Initialize GSAP animations for main menu only
  useIsomorphicLayoutEffect(() => {
    if (!menuRef.current || !menuOpen) return;

    // Set initial states - ensure menu is completely hidden
    gsap.set(menuRef.current, {
      opacity: 0,
      // Start off-screen to the right
    });


    // Create main timeline
    timelineRef.current = gsap.timeline({ paused: true }).to(menuRef.current, {
      opacity: 1,
      duration: 0.3,
      //ease: "power2.inOut",
    });

    return () => {
      timelineRef.current?.kill();
    };
  }, [menuOpen]);

  // Handle menu open/close
  useIsomorphicLayoutEffect(() => {
    if (!timelineRef.current || !menuRef.current) return;

    if (menuOpen) {
      // Play the open animation
      timelineRef.current.play();
    } else {
      // Reset states when menu closes
      setIsInnerMenuOpen(false);
      setSelectedMenu(null);
      setExpandedDropdowns(new Set());

      // Animate menu out
      gsap.to(menuRef.current, {
        x: "100%",
        opacity: 0,
        duration: 0.3,
        //ease: "power2.inOut",
      });
    }
  }, [menuOpen]);

  // Handle route changes
  useIsomorphicLayoutEffect(() => {
    const handleRouteChange = () => {
      dispatch({ type: "SET_MENU_OPEN", payload: false });
    };

    router.events.on("routeChangeStart", handleRouteChange);
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router, dispatch]);

  // Toggle dropdown expansion
  const toggleDropdown = useCallback((dropdownId: string) => {
    setExpandedDropdowns((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(dropdownId)) {
        newSet.delete(dropdownId);
      } else {
        newSet.add(dropdownId);
      }
      return newSet;
    });
  }, []);

  // Open inner menu
  const openInnerMenu = useCallback((menu: NavMobileProps) => {
    setSelectedMenu(menu);
    setIsInnerMenuOpen(true);
  }, []);

  // Close inner menu
  const closeInnerMenu = useCallback(() => {
    setIsInnerMenuOpen(false);
    setSelectedMenu(null);
    setExpandedDropdowns(new Set());
  }, []);

  // Don't render the menu at all if it's not open
  if (!menuOpen) {
    return null;
  }

  return (
    <>
      {/* Main Menu */}
      <div
        ref={menuRef}
        className={`menu flex-col font-HM-Sans fixed w-screen z-20 bg-[#fff] h-[95.4vh] top-[41px] left-0 transition-none duration-400 ${
          isInnerMenuOpen ? "-translate-x-full" : "translate-x-0"
        }`}
      >
        <div className="flex flex-col w-full relative top-[40px]">
          {navLinksMobile.map((outerLink, index) => (
            <div
              key={index}
              className={`flex justify-between items-center py-6 px-[15px] font-HM-Sans border-b border-b-[#0E0C22] cursor-pointer hover:bg-gray-50 transition-colors ${
                index === 0 && "h-fit"
              }`}
              onClick={() => outerLink.subLinks && openInnerMenu(outerLink)}
            >
              <span className="text-[12px] text-[#0E0C22]">
                {outerLink.title}
              </span>
              {outerLink.subLinks && (
                <Image
                  src={menu_arrow_right}
                  alt="menu arrow"
                  className="w-4 h-4"
                />
              )}
            </div>
          ))}
        </div>

        <div className="relative top-[88px] px-[15px]">
          <ul className="flex flex-col gap-3">
            {filteredNavLinks.map((link, index) => (
              <li key={index} className="text-[12px] relative">
                <Link
                  href={link.href}
                  className="hover:text-gray-600 transition-colors"
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Inner Menu */}
      <InnerMenu
        menu={selectedMenu}
        isOpen={isInnerMenuOpen}
        onClose={closeInnerMenu}
        expandedDropdowns={expandedDropdowns}
        onToggleDropdown={toggleDropdown}
      />
    </>
  );
};

interface InnerMenuProps {
  menu: NavMobileProps | null;
  isOpen: boolean;
  onClose: () => void;
  expandedDropdowns: Set<string>;
  onToggleDropdown: (dropdownId: string) => void;
}

const InnerMenu = ({
  menu,
  isOpen,
  onClose,
  expandedDropdowns,
  onToggleDropdown,
}: InnerMenuProps) => {
  // Don't render anything if no menu is selected
  if (!menu) {
    return null;
  }

  return (
    <div
      className={`innermenu font-HM-Sans flex-col fixed overflow-y-auto w-screen z-20 bg-[#fff] h-full top-[41px] left-0 bottom-0 transition-transform duration-400 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Header */}
      <div
        className="w-full h-fit grid grid-cols-3 py-6 px-[15px] border-b border-b-[#0E0C22] relative top-[40px] cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={onClose}
      >
        <Image
          src={menu_arrow_left}
          alt="menu arrow"
          className="block col-span-1 w-4 h-4"
        />
        <span className="text-[12px] text-[#0E0C22] col-span-1 text-center">
          {menu.title}
        </span>
      </div>

      {/* Menu Items */}
      <div className="relative top-[40px]">
        {menu.subLinks?.map((subLink, index) => (
          <div key={index} className="border-b border-b-[#0E0C22]">
            <div
              className="flex justify-between items-center py-6 px-[15px] text-[12px] text-[#0E0C22] cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() =>
                subLink.innerLinks && onToggleDropdown(`dropdown-${index}`)
              }
            >
              <span>{subLink.title}</span>
              {subLink.innerLinks && (
                <Image
                  src={menu_arrow_right}
                  alt="menu arrow"
                  className={`w-4 h-4 transition-transform duration-200 ${
                    expandedDropdowns.has(`dropdown-${index}`)
                      ? "rotate-90"
                      : "rotate-0"
                  }`}
                />
              )}
            </div>

            {/* Dropdown Content */}
            {subLink.innerLinks && (
              <div
                className={`overflow-hidden transition-all duration-200 ${
                  expandedDropdowns.has(`dropdown-${index}`)
                    ? "max-h-[1000px] opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <ul className="flex flex-col gap-[21px] px-[15px] pb-[21px]">
                  {subLink.innerLinks.map((innerLink, innerIndex) => (
                    <li key={innerIndex}>
                      <Link
                        href={innerLink.href}
                        className="text-[12px] flex justify-between items-center hover:text-gray-600 transition-colors"
                      >
                        {innerLink.link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
