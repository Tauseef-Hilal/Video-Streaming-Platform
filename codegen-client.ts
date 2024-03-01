import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "src/lib/graphql/api/schema/schema.gql",
  documents: "src/lib/graphql/client/documents/**/*.gql",
  ignoreNoDocuments: true,
  generates: {
    "src/lib/graphql/client/generated/": {
      preset: "client",
      plugins: [],
    },
  },
};

export default config;
