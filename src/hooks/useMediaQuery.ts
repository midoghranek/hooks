import { useState } from "react";
import { useDidUpdate } from "./useDidUpdate";
import { useWillUnmount } from "./useWillUnmount";

export const useMediaQuery = (mediaQuery: string) => {
  if (typeof window === "object" || "matchMedia" in window) {
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
