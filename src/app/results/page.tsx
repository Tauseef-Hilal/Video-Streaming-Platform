"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

import ContentFeed from "@/components/ContentFeed";

export default function ResultsPage() {
  return (
    <Suspense>
      <ResultsFeed />
    </Suspense>
  );
}

const ResultsFeed: React.FC = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");

  return (
    <ContentFeed
      query={query ?? ""}
      className={`
        h-full max-w-[90%] xl:max-w-[80%] 2xl:max-w-[70%] grid grid-cols-1 
        gap-5 place-content-start m-auto p-4
      `}
      videoCardClassName="sm:flex-row"
      infiniteScroll
    />
  );
};
