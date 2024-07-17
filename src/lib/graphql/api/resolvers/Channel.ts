import { videoFindManyArgs } from "@/lib/utils/graphql";
import { ChannelResolvers as ResolverTypes } from "../generated/types";

const ChannelResolvers: ResolverTypes = {
  snippet: (channel) => ({
    id: `${channel.id}#Snippet`,
    url: channel.url,
    title: channel.title,
    description: channel.description,
    country: channel.country,
    keywords: channel.keywords,
    thumbnailUrl: channel.thumbnailUrl,
  }),
  statistics: (channel) => ({
    id: `${channel.id}#Statistics`,
    viewCount: channel.viewCount,
    videoCount: channel.videoCount,
    subscriberCount: channel.subscriberCount,
  }),
  videos: async (channel, { skip, take, filter, sortBy }, { prisma }) =>
    prisma.video.findMany(
      videoFindManyArgs(skip, take, filter, sortBy, {
        where: { channelId: channel.id },
      })
    ),
};

export default ChannelResolvers;
