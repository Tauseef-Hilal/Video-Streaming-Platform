import { useEffect, useRef, useState } from "react";

interface LazyImageProps {
  src: string;
  width: number;
  height: number;
  alt: string;
  className: string;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  width,
  height,
  alt,
  className,
}) => {
  const [shouldRenderImage, setShouldRenderImage] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setShouldRenderImage(true);
      });
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`bg-[#2d2d2d] ${className}`}>
      {shouldRenderImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          width={width}
          height={height}
          alt={alt}
          className={className}
          loading="lazy"
          decoding="async"
        />
      )}
    </div>
  );
};

export default LazyImage;
