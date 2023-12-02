import { useState } from "react";
import useIsomorphicLayoutEffect from "./useIsomorphicLayoutEffect";

type ReturnType = {
  isMobile: boolean;
};

const useIpadHook = (): ReturnType => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useIsomorphicLayoutEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1028px)");
    setIsMobile(mediaQuery.matches);
    const handleMediaQueryChange = (event: any) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return { isMobile };
};

export default useIpadHook;
