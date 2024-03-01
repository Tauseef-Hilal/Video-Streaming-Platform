import { videoFindManyArgs } from "@/lib/utils/graphql";
import { QueryResolvers as ResolverTypes } from "../generated/types";

const QueryResolvers: ResolverTypes = {
  greetings: () => "Hello World!",
  videos: (_, { skip, take, filter, sortBy }, context) =>
    context.prisma.video.findMany(
      videoFindManyArgs(skip, take, filter, sortBy)
    ),
};

export default QueryResolvers;
