"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";

import VideoPreview from "./VideoPreview";
import VideoDetails from "./VideoDetails";
import { FeedQuery, Video } from "@/lib/graphql/client/generated/graphql";

interface VideoCardProps {
  video: FeedQuery["videos"][0];
  className?: string;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, className }) => {
  const [showMoreBtn, setShowMoreBtn] = useState(false);
  const isResultsPage = usePathname().endsWith("/results");

  return (
    <div
      className={`
        flex items-start gap-4 flex-col 
        ${isResultsPage ? "sm:flex-row" : ""}
        ${className}
      `}
      onMouseOver={() => setShowMoreBtn(true)}
      onMouseLeave={() => setShowMoreBtn(false)}
    >
      <VideoPreview
        thumbnailUrl={video.snippet.thumbnailUrl}
        duration={video.contentDetails.duration}
      />
      <VideoDetails
        videoSnippet={video.snippet}
        videoStats={video.statistics}
        showMoreBtn={showMoreBtn}
      />
    </div>
  );
};

export default VideoCard;
