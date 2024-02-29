import { VideoResolvers as ResolverTypes } from "../generated/types";

const VideoResolvers: ResolverTypes = {
  snippet: (video) => ({
    id: `${video.id}#Snippet`,
    title: video.title,
    description: video.description,
    channelId: video.channelId,
    categoryId: video.categoryId,
    publishedAt: video.publishedAt,
    tags: video.tags,
    thumbnailGroupId: video.thumbnailGroupId,
  }),
  contentDetails: (video) => ({
    id: `${video.id}#ContentDetails`,
    duration: video.duration,
    hasCaption: video.hasCaption,
  }),
  statistics: (video) => ({
    id: `${video.id}#Statistics`,
    likeCount: video.likeCount,
    viewCount: video.viewCount,
    commentCount: video.commentCount,
  }),
};

export default VideoResolvers;
