import { BsBroadcast } from "react-icons/bs";

import { getFormattedDuration } from "@/lib/utils/abc";
import { FragmentType, useFragment } from "@/lib/graphql/client/generated";
import {
  ThumbnailGroupItemFragmentDoc,
  ThumbnailItemFragmentDoc,
} from "@/lib/graphql/client/generated/graphql";
import LazyImage from "../LazyImage";

interface VideoPreviewProps {
  thumbnailGroupFragment: FragmentType<typeof ThumbnailGroupItemFragmentDoc>;
  duration: string;
}

const VideoPreview: React.FC<VideoPreviewProps> = ({
  thumbnailGroupFragment,
  duration,
}) => {
  const durationStr = getFormattedDuration(duration);
  const thumbnails = useFragment(
    ThumbnailGroupItemFragmentDoc,
    thumbnailGroupFragment
  );
  const thumbnail = useFragment(
    ThumbnailItemFragmentDoc,
    thumbnails.high ?? thumbnails.medium ?? thumbnails.low
  );

  return (
    <div className="relative w-full">
      <LazyImage
        src={thumbnail.url}
        width={thumbnail.width}
        height={thumbnail.height}
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
