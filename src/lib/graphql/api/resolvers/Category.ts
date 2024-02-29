import { videoFindManyArgs } from "@/lib/utils/graphql";
import { CategoryResolvers as ResolverTypes } from "../generated/types";

const CategoryResolvers: ResolverTypes = {
  videos: (category, { skip, take, filter, sortBy }, context) =>
    context.prisma.video.findMany(
      videoFindManyArgs(skip, take, filter, sortBy, {
        where: { categoryId: category.id },
      })
    ),
};

export default CategoryResolvers;
