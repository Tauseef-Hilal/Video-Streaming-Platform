import { ChannelSnippetResolvers as ResolverTypes } from "../generated/types";

const ChannelSnippetResolvers: ResolverTypes = {
  thumbnails: async (snippet, _, { prisma }) => {
    const thumbnailGroup = await prisma.thumbnailGroup.findUnique({
      where: { id: snippet.thumbnailGroupId },
    });

    if (!thumbnailGroup)
      throw new Error(
        `ThumbnailGroup ${snippet.thumbnailGroupId} does not exist`
      );

    return thumbnailGroup;
  },
};

export default ChannelSnippetResolvers;
