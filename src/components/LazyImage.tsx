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
  const ref = useRef<HTMLDivElement>(null);
  const [shouldRenderImage, setShouldRenderImage] = useState(false);
  const [dimensions, setDimensions] = useState([0, 0]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setShouldRenderImage(true);
      });
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    const aspectRatio = width / height;
    const clientWidth = ref.current?.clientWidth ?? 0;
    const clientHeight = ref.current?.clientHeight ?? 0;
    let placeholderWidth, placeholderHeight;

    if (clientWidth == 0 && clientHeight == 0) {
      placeholderWidth = width;
      placeholderHeight = height;
    } else if (clientWidth == 0) {
      placeholderHeight = clientHeight;
      placeholderWidth = aspectRatio * placeholderHeight;
    } else if (clientHeight == 0) {
      placeholderWidth = clientWidth;
      placeholderHeight = placeholderWidth / aspectRatio;
    } else {
      placeholderWidth = clientWidth;
      placeholderHeight = clientHeight;
    }

    setDimensions([placeholderWidth, placeholderHeight]);
    return () => observer.disconnect();
  }, [width, height]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      {shouldRenderImage ? (
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
      ) : (
        <div
          style={{
            maxWidth: width,
            maxHeight: height,
            width: dimensions[0] || width,
            height: dimensions[1] || height,
          }}
        />
      )}
    </div>
  );
};

export default LazyImage;
