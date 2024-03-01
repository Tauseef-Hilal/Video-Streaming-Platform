"use client";

import { useState } from "react";

import VideoPreview from "./VideoPreview";
import VideoDetails from "./VideoDetails";
import { FragmentType, useFragment } from "@/lib/graphql/client/generated";
import { VideoItemFragmentDoc } from "@/lib/graphql/client/generated/graphql";

interface VideoCardProps {
  v: FragmentType<typeof VideoItemFragmentDoc>;
}

const VideoCard: React.FC<VideoCardProps> = ({ v }) => {
  const [showMoreBtn, setShowMoreBtn] = useState(false);
  const video = useFragment(VideoItemFragmentDoc, v);

  return (
    <div
      className="flex flex-col gap-2 aspect-video"
      onMouseOver={() => setShowMoreBtn(true)}
      onMouseLeave={() => setShowMoreBtn(false)}
    >
      <VideoPreview
        thumbnails={video.snippet.thumbnails}
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
