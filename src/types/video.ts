import { Platform } from "./platform";
import { ThumbnailGroup } from "./thumbnail";

export type Video = {
  id: string;
  platform: Platform;
  snippet: VideoSnippet;
  contentDetails: VideoContentDetails;
  statistics: VideoStatistics;
};

export type VideoSnippet = {
  title: string;
  description: string;
  publishedAt: string;
  thumbnails: ThumbnailGroup;
  channelId: string;
  channelTitle: string;
  channelThumbnail: ThumbnailGroup;
};

export type VideoContentDetails = {
  duration: string;
  caption: boolean;
};

export type VideoStatistics = {
  viewCount: string;
  likeCount: string;
  commentCount: string;
};

export default Video;
