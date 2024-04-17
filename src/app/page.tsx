"use client";

import { useEffect, useState } from "react";
import { useApolloClient } from "@apollo/client";

import LoadingIndicator from "@/components/LoadingIndicator";
import ErrorComponent from "@/components/ErrorComponent";
import VideoCard from "@/components/VideoCard/VideoCard";
import {
  FeedDocument,
  FeedQuery,
} from "@/lib/graphql/client/generated/graphql";
import LazyLoader from "@/components/LazyLoader";
import { MdMoreHoriz } from "react-icons/md";

export default function HomePage() {
  const client = useApolloClient();
  const [hasMoreVideos, setHasMoreVideos] = useState(true);
  const [videos, setVideos] = useState<FeedQuery["videos"]>([]);
  const [status, setStatus] = useState<"LOADING" | "ERROR" | "SUCCESS">(
    "LOADING"
  );
  const fetchVideos = async () => {
    if (!hasMoreVideos) return;

    const { loading, error, data } = await client.query({
      query: FeedDocument,
      variables: { skip: videos.length },
    });

    if (loading) setStatus("LOADING");
    else if (error) setStatus("ERROR");
    else {
      setStatus("SUCCESS");
      if (data.videos.length === 0) {
        setHasMoreVideos(false);
      } else {
        setVideos((v) => [...v, ...data.videos]);
      }
    }
  };

  useEffect(() => {
    fetchVideos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (status == "LOADING") return <LoadingIndicator className="h-full" />;
  if (status == "ERROR")
    return (
      <ErrorComponent
        text={"Oops! Something went wrong"}
        onRetryClick={fetchVideos}
      />
    );

  return (
    <>
      <div
        className={`
          h-full grid gap-8 place-content-start justify-center grid-cols-1
          md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4
        `}
      >
        {videos.map((video, idx) => (
          <VideoCard key={idx} videoFragment={video} />
        ))}
      </div>

      {hasMoreVideos ? (
        <LazyLoader onScrollIntoView={fetchVideos} />
      ) : (
        <div className="grid place-content-center text-gray-400">
          <MdMoreHoriz size={30} />
        </div>
      )}
    </>
  );
}
