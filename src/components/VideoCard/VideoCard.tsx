"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";

import VideoPreview from "./VideoPreview";
import VideoDetails from "./VideoDetails";
import { FragmentType, useFragment } from "@/lib/graphql/client/generated";
import { VideoItemFragmentDoc } from "@/lib/graphql/client/generated/graphql";

interface VideoCardProps {
  videoFragment: FragmentType<typeof VideoItemFragmentDoc>;
  className?: string;
}

const VideoCard: React.FC<VideoCardProps> = ({ videoFragment, className }) => {
  const [showMoreBtn, setShowMoreBtn] = useState(false);
  const video = useFragment(VideoItemFragmentDoc, videoFragment);
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
        thumbnailGroupFragment={video.snippet.thumbnails}
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
