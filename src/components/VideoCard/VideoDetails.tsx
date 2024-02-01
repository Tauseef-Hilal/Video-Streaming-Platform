import Image from "next/image";
import { FiMoreVertical } from "react-icons/fi";

import { getFormattedDifference, getFormattedViewCount } from "@/lib/utils";
import { VideoSnippet, VideoStatistics } from "@/types/video";

interface VideoDetailsProps {
  videoSnippet: VideoSnippet;
  videoStats: VideoStatistics;
  showMoreBtn: boolean;
}

const VideoDetails: React.FC<VideoDetailsProps> = ({
  videoSnippet,
  videoStats,
  showMoreBtn,
}) => {
  const timeSinceUpload = getFormattedDifference(videoSnippet.publishedAt);
  const viewCount = getFormattedViewCount(videoStats.viewCount);
  const channelThumbnail =
    videoSnippet.channelThumbnail.low ??
    videoSnippet.channelThumbnail.medium ??
    videoSnippet.channelThumbnail.high;

  return (
    <div className="flex justify-between items-start">
      <div className="flex gap-3 items-start">
        <Image
          src={channelThumbnail.url}
          alt="Channel Thumbnail"
          className="rounded-full flex-shrink-0"
          width={40}
          height={40}
        />
        <div>
          <h2 className="font-medium line-clamp-2">{videoSnippet.title}</h2>
          <p className="text-sm text-neutral-400 line-clamp-1">
            {videoSnippet.channelTitle}
          </p>
          <p className="text-sm text-neutral-400">
            {viewCount} views • {timeSinceUpload} ago
          </p>
        </div>
      </div>
      <div className="w-8 flex justify-end">
        {showMoreBtn && <FiMoreVertical className="text-lg" />}
      </div>
    </div>
  );
};

export default VideoDetails;
