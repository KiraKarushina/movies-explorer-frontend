import { useLayoutEffect, useState } from "react";

import { SW_1280 } from "../utils/constants";

export const useGetWidthWindow = () => {
  const [width, setWidth] = useState(SW_1280);
  useLayoutEffect(() => {
    const getWidth = () => {
      setWidth(window.innerWidth);
    };

    function debounce(func, ms) {
      let timer;
      return () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          timer = null;
          func.apply(this, arguments);
        }, ms);
      };
    }

    const debouncedGetWidth = debounce(getWidth, 1000);

    window.addEventListener("resize", debouncedGetWidth);
    getWidth();
    return () => window.removeEventListener("resize", debouncedGetWidth);
  }, []);
  return width;
};
