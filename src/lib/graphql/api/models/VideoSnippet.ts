type VideoSnippet = {
  id: string;
  url: string;
  title: string;
  description: string;
  channelId: string;
  categoryId: number;
  publishedAt: Date;
  tags: string[];
  thumbnailUrl: string;
};

export default VideoSnippet;
