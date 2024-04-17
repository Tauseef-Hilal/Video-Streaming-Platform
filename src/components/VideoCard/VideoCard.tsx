"use client";

import { useState } from "react";

import VideoPreview from "./VideoPreview";
import VideoDetails from "./VideoDetails";
import { FragmentType, useFragment } from "@/lib/graphql/client/generated";
import { VideoItemFragmentDoc } from "@/lib/graphql/client/generated/graphql";
import { usePathname } from "next/navigation";

interface VideoCardProps {
  videoFragment: FragmentType<typeof VideoItemFragmentDoc>;
}

const VideoCard: React.FC<VideoCardProps> = ({ videoFragment }) => {
  const [showMoreBtn, setShowMoreBtn] = useState(false);
  const video = useFragment(VideoItemFragmentDoc, videoFragment);
  const isResultsPage = usePathname().endsWith("/results");

  return (
    <div
      className={`
        flex items-start gap-4 flex-col 
        ${isResultsPage ? "sm:flex-row" : ""}
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
