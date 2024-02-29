import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "src/lib/graphql/api/schema/schema.gql",
  generates: {
    "src/lib/graphql/api/generated/types.ts": {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        contextType: "../context#Context",
        mappers: {
          Video: "../models#VideoModel",
          VideoSnippet: "../models#VideoSnippetModel",
          Category: "../models#CategoryModel",
          Channel: "../models#ChannelModel",
          ChannelSnippet: "../models#ChannelSnippetModel",
          ThumbnailGroup: "../models#ThumbnailGroupModel",
          Thumbnail: "../models#ThumbnailModel",
        },
      },
    },
  },
};

export default config;
