"use client";

import { useState } from "react";
import { FiMoreVertical } from "react-icons/fi";

import { Video } from "@/lib/types";

interface VideoCardProp {
  video: Video;
}

const VideoCard: React.FC<VideoCardProp> = ({ video }) => {
  const [showMoreBtn, setShowMoreBtn] = useState(false);

  return (
    <div
      className={`
        h-[320px] max-w-[460px] md:h-min aspect-video flex flex-col gap-2
      `}
      onMouseOver={() => setShowMoreBtn(true)}
      onMouseLeave={() => setShowMoreBtn(false)}
    >
      <div className="bg-gray-800 opacity-80 h-full rounded-xl"></div>
      <div className="flex justify-between items-start">
        <div className="flex gap-4">
          <div className="bg-gray-800 w-[40px] h-[40px] rounded-full"></div>
          <div className="text-sm">
            <h2 className="text-base font-medium">{video.title}</h2>
            <p className="text-neutral-400">{video.creator}</p>
            <p className="text-neutral-400">
              {video.viewCount} views • {video.uploadDate}
            </p>
          </div>
        </div>
        {showMoreBtn && <FiMoreVertical className="text-xl" />}
      </div>
    </div>
  );
};

export default VideoCard;
