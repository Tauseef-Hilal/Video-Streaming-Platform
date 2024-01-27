import VideoCard from "@/components/VideoCard";

export default function Home() {
  return (
    <div
      className={`
      h-full grid gap-8 place-content-start justify-center grid-cols-1
      md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4
    `}
    >
      {fakeData.map((video, idx) => (
        <VideoCard key={idx} video={video} />
      ))}
    </div>
  );
}

const fakeData = new Array(20).fill({
  title: "Lorem ipsum dolar",
  creator: "Lorem",
  viewCount: "22M",
  uploadDate: "2 days ago",
});
