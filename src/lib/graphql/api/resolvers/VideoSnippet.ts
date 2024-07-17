import { VideoSnippetResolvers as ResolverTypes } from "../generated/types";

const VideoSnippetResolvers: ResolverTypes = {
  channel: async (snippet, _, { prisma }) => {
    const channel = await prisma.channel.findUnique({
      where: { id: snippet.channelId },
    });

    if (!channel)
      throw new Error(`Channel ${snippet.channelId} does not exist`);

    return channel;
  },
  category: async (snippet, _, { prisma }) => {
    const category = await prisma.category.findUnique({
      where: { id: snippet.categoryId },
    });

    if (!category)
      throw new Error(`Category ${snippet.categoryId} does not exist`);

    return category;
  },
};

export default VideoSnippetResolvers;
