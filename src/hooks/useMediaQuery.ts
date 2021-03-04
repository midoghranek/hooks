import { useState } from "react";
import { useDidUpdate } from "./useDidUpdate";
import { useWillUnmount } from "./useWillUnmount";

const isClient = typeof window === "object";
const isSupported = (api: string) => api in window;

export const useMediaQuery = (mediaQuery: string) => {
  if (!isClient || !isSupported("matchMedia")) {
    return null;
  }

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
};
