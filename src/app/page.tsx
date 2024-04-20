import ContentFeed from "@/components/ContentFeed";

export default function HomePage() {
  return (
    <ContentFeed
      query=""
      className={`
        h-full grid gap-8 place-content-start justify-center grid-cols-1
        md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 p-4
      `}
    />
  );
}
