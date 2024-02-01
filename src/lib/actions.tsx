"use server";

import Video from "@/types/video";
import { ThumbnailGroup } from "@/types/thumbnail";

const API_KEY = process.env.YOUTUBE_API_KEY;
const BASE_URL = process.env.YOUTUBE_API_BASE_URL;

export async function fetchVideosFromYoutube() {
  const API_URL = `${BASE_URL}/search?key=${API_KEY}&part=id&maxResults=50`;
  const res = await fetch(API_URL);

  if (res.status != 200) {
    throw "Error!";
  }

  const data = await res.json();
  const videoIds: string[] = [];

  for (const video of data.items) {
    videoIds.push(video.id.videoId);
  }

  return fetchYoutubeVideosByIds(videoIds);
}

async function fetchYoutubeVideosByIds(videoIds: string[]) {
  const videoIdsStr = videoIds.join(",");
  const API_URL =
    `${BASE_URL}/videos?key=${API_KEY}` +
    `&id=${videoIdsStr}` +
    `&part=contentDetails,snippet,statistics` +
    `&maxResults=50`;

  const res = await fetch(API_URL);
  if (res.status != 200) {
    throw "Error!";
  }

  const data = await res.json();
  const channelIds: string[] = [];
  const videos: Video[] = data.items.map((videoData: any) => {
    const { id, snippet, contentDetails, statistics } = videoData;
    channelIds.push(snippet.channelId);

    return {
      id,
      snippet: {
        publishedAt: snippet.publishedAt,
        channelId: snippet.channelId,
        channelTitle: snippet.channelTitle,
        title: snippet.title,
        description: snippet.description,
        thumbnails: {
          low: snippet.thumbnails.default,
          medium: snippet.thumbnails.standard,
          high: snippet.thumbnails.maxres,
        },
      },
      contentDetails: {
        duration: contentDetails.duration,
        caption: contentDetails.caption,
      },
      statistics: {
        viewCount: statistics.viewCount,
        likeCount: statistics.likeCount,
        commentCount: statistics.commentCount,
      },
    };
  });

  const channelThumbnails: { [id: string]: ThumbnailGroup } =
    await fetchThumbnailsByChannelIds(channelIds);

  for (const video of videos) {
    video.snippet.channelThumbnail = channelThumbnails[
      video.snippet.channelId
    ] ?? {
      low: {
        url: "https://gravatar.com/avatar?d=mp",
        width: 40,
        height: 40,
      },
    };
  }

  return videos;
}

export async function fetchThumbnailsByChannelIds(channelIds: string[]) {
  const channelIdsStr = channelIds.join(",");
  const API_URL =
    `${BASE_URL}/channels?key=${API_KEY}` +
    `&id=${channelIdsStr}` +
    `&part=snippet` +
    `&maxResults=50`;

  const res = await fetch(API_URL);
  if (res.status != 200) {
    throw "Error!";
  }

  const data = await res.json();
  const thumbnails: { [id: string]: ThumbnailGroup } = {};

  data.items.forEach((channelData: any) => {
    thumbnails[channelData.id] = {
      low: channelData.snippet.thumbnails.default,
      medium: channelData.snippet.thumbnails.medium,
      high: channelData.snippet.thumbnails.high,
    };
  });

  return thumbnails;
}
