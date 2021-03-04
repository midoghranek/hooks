// useWillUnmount similar to componentWillUnmount
import { useEffect } from "react";

export const useWillUnmount = (callback: Function) =>
  useEffect(() => () => callback?.(), []);
