import { ThumbnailGroupResolvers as ResolverTypes } from "../generated/types";

const ThumbnailGroupResolvers: ResolverTypes = {
  low: async (thumbnails, _, { prisma }) => {
    if (!thumbnails.lowId) return DEFAULT_THUMBNAIL;

    const thumbnail = await prisma.thumbnail.findUnique({
      where: { id: thumbnails.lowId },
    });

    return thumbnail ?? DEFAULT_THUMBNAIL;
  },
  medium: async (thumbnails, _, { prisma }) => {
    if (!thumbnails.mediumId) return null;

    return await prisma.thumbnail.findUnique({
      where: { id: thumbnails.mediumId },
    });
  },
  high: async (thumbnails, _, { prisma }) => {
    if (!thumbnails.highId) return null;

    return await prisma.thumbnail.findUnique({
      where: { id: thumbnails.highId },
    });
  },
};

const DEFAULT_THUMBNAIL = {
  id: "DEFAULT_THUMBNAIL",
  url: "https://gravatar.com/avatar?d=mp",
  width: 40,
  height: 40,
};

export default ThumbnailGroupResolvers;
