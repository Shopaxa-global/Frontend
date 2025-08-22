import { useEffect, useState } from "react";

type ReturnType = {
  isMobile: boolean;
  isLoading: boolean;
};

const useIpadHook = (): ReturnType => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Function to check if mobile
    const checkMobile = () => {
      return window.matchMedia("(max-width: 1028px)").matches;
    };

    // Set initial state
    setIsMobile(checkMobile());
    setIsLoading(false);

    // Add event listener for resize
    const mediaQuery = window.matchMedia("(max-width: 1028px)");
    const handleChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return { isMobile, isLoading };
};

export default useIpadHook;
