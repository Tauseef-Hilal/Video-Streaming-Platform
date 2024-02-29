import { Prisma } from "@prisma/client";

import {
  InputMaybe,
  VideoSortByInput,
} from "@/lib/graphql/api/generated/types";

export function videoFindManyArgs(
  skip?: InputMaybe<number>,
  take?: InputMaybe<number>,
  filter?: InputMaybe<string>,
  sortBy?: InputMaybe<VideoSortByInput>,
  options?: { where: Prisma.VideoWhereInput }
): Prisma.VideoFindManyArgs {
  return {
    skip: skip ?? undefined,
    take: take ?? undefined,
    orderBy: {
      title: sortBy?.title ?? undefined,
      publishedAt: sortBy?.publishedAt ?? undefined,
    },
    where: {
      OR: [
        { title: { contains: filter ?? "" } },
        { description: { contains: filter ?? "" } },
      ],
      AND: options?.where,
    },
  };
}
