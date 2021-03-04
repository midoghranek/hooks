// useDidMount similar to componentDidMount
import { useEffect } from "react";

export const useDidMount = (callback: Function) =>
  useEffect(() => callback?.(), []);
