import { useState } from "react";
import { useDidUpdate } from "./useDidUpdate";
import { useWillUnmount } from "./useWillUnmount";

export const useMediaQuery = (mediaQuery: string) => {
  const isMedia = () => {
    if (typeof window === "object") return "matchMedia" in window;
    return false;
  };

  if (isMedia) {
    const [match, setMatch] = useState(!!window.matchMedia(mediaQuery).matches);

    const mediaQueryList = window?.matchMedia(mediaQuery);
    const documentChangeHandler = () => {
      setMatch(!!mediaQueryList?.matches);
    };

    useDidUpdate(() => {
      mediaQueryList.addEventListener("change", documentChangeHandler);
      documentChangeHandler();
    }, [match]);

    useWillUnmount(() => {
      mediaQueryList.removeEventListener("change", documentChangeHandler);
    });

    return match;
  } else return null;
};
