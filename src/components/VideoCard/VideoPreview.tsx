import { BsBroadcast } from "react-icons/bs";

import { getFormattedDuration } from "@/lib/utils/abc";
import LazyImage from "../LazyImage";

interface VideoPreviewProps {
  thumbnailUrl: string;
  duration: number;
}

const VideoPreview: React.FC<VideoPreviewProps> = ({
  thumbnailUrl,
  duration,
}) => {
  const durationStr = getFormattedDuration(duration);
  
  return (
    <div className="relative w-full overflow-hidden">
      <LazyImage
        src={thumbnailUrl}
        width={1920}
        height={1080}
        className="rounded-xl w-full object-cover aspect-video"
        alt="Video Thumbnail"
      />
      {durationStr ? (
        <span
          className={`
          bg-[#0f0f0f] absolute bottom-1 right-1 
            rounded-md py-[2px] px-[6px] text-xs text-center
          `}
        >
          {durationStr}
        </span>
      ) : (
        <div
          className={`
            absolute bottom-2 right-2 rounded-sm text-xs flex items-center 
            gap-1 bg-red-600 px-1 font-medium
          `}
        >
          <BsBroadcast /> <span>LIVE</span>
        </div>
      )}
    </div>
  );
};

export default VideoPreview;
