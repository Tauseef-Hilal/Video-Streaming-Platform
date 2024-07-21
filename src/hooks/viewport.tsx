import { useEffect, useState } from "react";

const useViewportWidth = (
  shouldUpdate: (storedWidth: number, viewportWidth: number) => boolean
) => {
  const [viewportWidth, setViewportWidth] = useState(0);

  useEffect(() => {
    function resizeHandler() {
      // Only update if `shouldUpdate` returns true
      if (shouldUpdate(viewportWidth, window.innerWidth)) {
        setViewportWidth(window.innerWidth);
      }
    }

    // Update viewportWidth because its initially set to 0
    setViewportWidth(window.innerWidth);

    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, [viewportWidth, shouldUpdate]);

  return viewportWidth;
};

export default useViewportWidth;
