"use client";

import { useState } from "react";

import Video from "@/types/video";
import VideoPreview from "./VideoPreview";
import VideoDetails from "./VideoDetails";

interface VideoCardProps {
  video: Video;
}

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  const [showMoreBtn, setShowMoreBtn] = useState(false);

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
