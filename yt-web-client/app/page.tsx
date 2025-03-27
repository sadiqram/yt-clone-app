import { getVideos } from "./firebase/functions";
import Link from "next/link";
// import Image from "next/image";

export default async function Home() {
  const videos = await getVideos();

  return (
    <main className="flex flex-wrap gap-4 p-4 justify-start">
    {videos.map((video) => (
      <Link key={video.id} href={`/watch?v=${video.filename}`}>
        <video
          src={`https://storage.googleapis.com/sram-yt-processed-vids/${video.filename}`}
          className="w-48 h-28 object-cover rounded-md shadow-md"
          muted
          preload="metadata"
        />
      </Link>
    ))}
  </main>
  
  );
}


// disables default next.js caching
export const revalidate = 30; // segment level caching
