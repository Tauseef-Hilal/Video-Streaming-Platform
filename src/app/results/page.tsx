"use client";

import ErrorComponent from "@/components/ErrorComponent";
import LazyLoader from "@/components/LazyLoader";
import LoadingIndicator from "@/components/LoadingIndicator";
import VideoCard from "@/components/VideoCard/VideoCard";
import {
  FeedDocument,
  FeedQuery,
} from "@/lib/graphql/client/generated/graphql";
import { useApolloClient } from "@apollo/client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { MdMoreHoriz } from "react-icons/md";

export default function ResultsPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");

  const client = useApolloClient();
  const [hasMoreVideos, setHasMoreVideos] = useState(true);
  const [videos, setVideos] = useState<FeedQuery["videos"]>([]);
  const [status, setStatus] = useState<"LOADING" | "ERROR" | "SUCCESS">(
    "LOADING"
  );
  const fetchVideos = async (shouldSkip: boolean = true) => {
    const { loading, error, data } = await client.query({
      query: FeedDocument,
      variables: { skip: shouldSkip ? videos.length : 0, filter: query },
    });

    if (loading) setStatus("LOADING");
    else if (error) setStatus("ERROR");
    else {
      setStatus("SUCCESS");
      if (data.videos.length === 0) {
        setHasMoreVideos(false);
        if (!shouldSkip) setVideos([]);
      } else {
        setVideos((v) => (shouldSkip ? [...v, ...data.videos] : data.videos));
      }
    }
  };

  useEffect(() => {
    fetchVideos(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  if (status == "LOADING") return <LoadingIndicator className="h-full" />;
  if (status == "ERROR")
    return (
      <ErrorComponent
        text={"Oops! Something went wrong"}
        onRetryClick={fetchVideos}
      />
    );

  return (
    <div className="flex flex-col gap-5">
      <div
        className={`
          h-full max-w-[90%] grid grid-cols-1 gap-5
          place-content-start m-auto
        `}
      >
        {videos.map((video, idx) => (
          <VideoCard key={idx} videoFragment={video} />
        ))}
      </div>

      {videos.length == 0 && (
        <p className="text-gray-300 text-center">No results found</p>
      )}

      {hasMoreVideos ? (
        <LazyLoader onScrollIntoView={fetchVideos} />
      ) : (
        <div className="grid place-content-center text-gray-400">
          <MdMoreHoriz size={30} />
        </div>
      )}
    </div>
  );
}
