"use client";

import { useQuery } from "@apollo/client";

import LoadingIndicator from "@/components/LoadingIndicator";
import ErrorComponent from "@/components/ErrorComponent";
import VideoCard from "@/components/VideoCard/VideoCard";
import { FeedDocument } from "@/lib/graphql/client/generated/graphql";

export default function HomePage() {
  const { loading, error, data, refetch } = useQuery(FeedDocument);

  if (loading) return <LoadingIndicator className="h-full" />;
  if (error)
    return <ErrorComponent text={error.message} onRetryClick={refetch} />;

  return (
    <div
      className={`
        h-full grid gap-8 place-content-start justify-center grid-cols-1
        md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4
      `}
    >
      {data?.videos.map((video, idx) => (
        <VideoCard key={idx} v={video} />
      ))}
    </div>
  );
}
