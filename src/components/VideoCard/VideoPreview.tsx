import { BsBroadcast } from "react-icons/bs";

import { getFormattedDuration } from "@/lib/utils/abc";
import { FragmentType, useFragment } from "@/lib/graphql/client/generated";
import {
  ThumbnailGroupItemFragmentDoc,
  ThumbnailItemFragmentDoc,
} from "@/lib/graphql/client/generated/graphql";

interface VideoPreviewProps {
  thumbnails: FragmentType<typeof ThumbnailGroupItemFragmentDoc>;
  duration: string;
}

const VideoPreview: React.FC<VideoPreviewProps> = ({
  thumbnails,
  duration,
}) => {
  const durationStr = getFormattedDuration(duration);
  const t = useFragment(ThumbnailGroupItemFragmentDoc, thumbnails);
  const thumbnail = useFragment(
    ThumbnailItemFragmentDoc,
    t.high ?? t.medium ?? t.low
  );

  return (
    <div className="relative flex justify-center flex-col">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={thumbnail.url}
        width={thumbnail.width}
        height={thumbnail.height}
        className="rounded-xl w-full object-cover aspect-video"
        alt="Video Thumbnail"
        loading="lazy"
        decoding="async"
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
