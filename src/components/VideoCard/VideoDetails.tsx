import { FiMoreVertical } from "react-icons/fi";

import { getFormattedDifference, getFormattedViewCount } from "@/lib/utils/abc";
import {
  ThumbnailGroupItemFragmentDoc,
  ThumbnailItemFragmentDoc,
  VideoItemFragment,
} from "@/lib/graphql/client/generated/graphql";
import { useFragment } from "@/lib/graphql/client/generated";
import LazyImage from "../LazyImage";
import { usePathname } from "next/navigation";

interface VideoDetailsProps {
  videoSnippet: VideoItemFragment["snippet"];
  videoStats: VideoItemFragment["statistics"];
  showMoreBtn: boolean;
}

const VideoDetails: React.FC<VideoDetailsProps> = ({
  videoSnippet,
  videoStats,
  showMoreBtn,
}) => {
  const timeSinceUpload = getFormattedDifference(videoSnippet.publishedAt);
  const viewCount = getFormattedViewCount(videoStats.viewCount);
  const thumbnails = useFragment(
    ThumbnailGroupItemFragmentDoc,
    videoSnippet.channel.snippet.thumbnails
  );
  const thumbnail = useFragment(ThumbnailItemFragmentDoc, thumbnails.low);
  const onResultsPage = usePathname().endsWith("/results");

  return (
    <div className="flex justify-between items-start w-full overflow-hidden">
      <div className="flex gap-3 justify-start items-start">
        {!onResultsPage && (
          <LazyImage
            src={thumbnail.url}
            alt="Channel Thumbnail"
            className="rounded-full flex-shrink-0"
            width={40}
            height={40}
          />
        )}
        <div className="flex flex-col">
          {onResultsPage ? (
            <>
              <h2 className="font-medium line-clamp-1">{videoSnippet.title}</h2>
              <p className="text-sm text-neutral-400">
                {viewCount} views • {timeSinceUpload} ago
              </p>
              <div className="flex items-center gap-2 my-2">
                <LazyImage
                  src={thumbnail.url}
                  alt="Channel Thumbnail"
                  className="rounded-full flex-shrink-0"
                  width={24}
                  height={24}
                />
                <p className="text-sm text-neutral-400 line-clamp-1">
                  {videoSnippet.channel.snippet.title}
                </p>
              </div>
              <p
                className={`
                  hidden sm:block text-sm text-neutral-400 line-clamp-2
                `}
              >
                {videoSnippet.description.slice(0, 100)}
              </p>
            </>
          ) : (
            <>
              <h2 className="font-medium line-clamp-2">{videoSnippet.title}</h2>
              <div className="mt-1">
                <p className="text-sm text-neutral-400 line-clamp-1">
                  {videoSnippet.channel.snippet.title}
                </p>
                <p className="text-sm text-neutral-400">
                  {viewCount} views • {timeSinceUpload} ago
                </p>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="w-8 flex justify-end">
        {showMoreBtn && <FiMoreVertical className="text-lg" />}
      </div>
    </div>
  );
};

export default VideoDetails;
