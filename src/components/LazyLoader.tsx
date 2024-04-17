import { useEffect, useRef } from "react";
import LoadingIndicator from "./LoadingIndicator";

interface LazyLoaderProps {
  onScrollIntoView: () => void;
}

const LazyLoader: React.FC<LazyLoaderProps> = ({ onScrollIntoView }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          onScrollIntoView();
        }
      });
    });

    if (ref.current) {
      intersectionObserver.observe(ref.current);
    }

    return () => {
      intersectionObserver.disconnect();
    };
  }, [onScrollIntoView]);

  return (
    <div ref={ref}>
      <LoadingIndicator iconClassName="text-xl" />
    </div>
  );
};

export default LazyLoader;
