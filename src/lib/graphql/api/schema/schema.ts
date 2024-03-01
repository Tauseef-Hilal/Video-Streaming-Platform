import path from "path";
import { readFileSync } from "fs";
import { makeExecutableSchema } from "graphql-tools";

import { Resolvers } from "../generated/types";
import QueryResolvers from "../resolvers/Query";
import VideoResolvers from "../resolvers/Video";
import VideoSnippetResolvers from "../resolvers/VideoSnippet";
import ThumbnailGroupResolvers from "../resolvers/ThumbnailGroup";
import ChannelResolvers from "../resolvers/Channel";
import CategoryResolvers from "../resolvers/Category";
import ChannelSnippetResolvers from "../resolvers/ChannelSnippet";

const typeDefs = readFileSync(
  path.resolve("src/lib/graphql/api/schema/schema.gql"),
  "utf-8"
);

const resolvers: Resolvers = {
  Query: QueryResolvers,
  Video: VideoResolvers,
  VideoSnippet: VideoSnippetResolvers,
  Category: CategoryResolvers,
  Channel: ChannelResolvers,
  ChannelSnippet: ChannelSnippetResolvers,
  ThumbnailGroup: ThumbnailGroupResolvers,
};

export default makeExecutableSchema({ typeDefs, resolvers });
