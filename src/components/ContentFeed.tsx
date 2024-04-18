"use client";

import { useEffect, useState } from "react";
import { useApolloClient } from "@apollo/client";
import { MdMoreHoriz } from "react-icons/md";

import {
  FeedDocument,
  FeedQuery,
} from "@/lib/graphql/client/generated/graphql";
import VideoCard from "./VideoCard/VideoCard";
import LazyLoader from "./LazyLoader";
import LoadingIndicator from "./LoadingIndicator";
import ErrorComponent from "./ErrorComponent";

interface ContentFeedProps {
  query: string;
  className: string;
}

const ContentFeed: React.FC<ContentFeedProps> = ({ query, className }) => {
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
      <div className={className}>
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
};

export default ContentFeed;
