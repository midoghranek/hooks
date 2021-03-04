// useDidUpdate similar to componentDidUpdate
import { useEffect, useRef } from "react";

export const useDidUpdate = (callback: Function, deps: []) => {
  const didMountRef = useRef(false);
  useEffect(
    () => (didMountRef.current ? callback?.() : (didMountRef.current = true)),
    [...deps]
  );
};
