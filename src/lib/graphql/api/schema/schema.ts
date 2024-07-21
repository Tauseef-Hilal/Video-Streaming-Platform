import path from "path";
import { readFileSync } from "fs";
import { makeExecutableSchema } from "graphql-tools";

import { Resolvers } from "../generated/types";
import QueryResolvers from "../resolvers/Query";
import VideoResolvers from "../resolvers/Video";
import VideoSnippetResolvers from "../resolvers/VideoSnippet";
import ChannelResolvers from "../resolvers/Channel";
import CategoryResolvers from "../resolvers/Category";
import DateTimeResolver from "../resolvers/DateTime";
import MutationResolvers from "../resolvers/Mutation";

const typeDefs = readFileSync(
  path.resolve("src/lib/graphql/api/schema/schema.gql"),
  "utf-8"
);

const resolvers: Resolvers = {
  Query: QueryResolvers,
  Mutation: MutationResolvers,
  Video: VideoResolvers,
  VideoSnippet: VideoSnippetResolvers,
  Category: CategoryResolvers,
  Channel: ChannelResolvers,
  DateTime: DateTimeResolver,
};

export default makeExecutableSchema({ typeDefs, resolvers });
