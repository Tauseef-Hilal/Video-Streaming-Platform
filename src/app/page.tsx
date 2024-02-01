"use client";

import { useEffect, useState } from "react";

import Video from "@/types/video";
import VideoCard from "@/components/VideoCard/VideoCard";
import LoadingIndicator from "@/components/LoadingIndicator";
import ErrorComponent from "@/components/ErrorComponent";
import { fetchVideosFromYoutube } from "@/lib/actions";

type HomePageState = "LOADING" | "SUCCESS" | "ERROR";

export default function HomePage() {
  const [state, setState] = useState<HomePageState>("LOADING");
  const [videos, setVideos] = useState<Video[]>([]);

  const fetchVideos = () => {
    fetchVideosFromYoutube()
      .then((data) => {
        setVideos(data);
        setState("SUCCESS");
      })
      .catch((_) => {
        setTimeout(() => setState("ERROR"), 1000);
      });

    setState("LOADING");
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  switch (state) {
    case "LOADING":
      return <LoadingIndicator />;
    case "ERROR":
      return (
        <ErrorComponent
          text="Oops! Something went wrong"
          onRetryClick={() => fetchVideos()}
        />
      );
    default:
      return (
        <div
          className={`
            h-full grid gap-8 place-content-start justify-center grid-cols-1
            md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4
          `}
        >
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      );
  }
}
