import { NextRequest } from "next/server";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";

import schema from "@/lib/graphql/api/schema/schema";
import prismaClient from "@/lib/prisma";

const server = new ApolloServer({ schema });
const handler = startServerAndCreateNextHandler(server, {
  context: async () => ({
    prisma: prismaClient,
  }),
});

export async function GET(request: NextRequest) {
  return handler(request);
}

export async function POST(request: NextRequest) {
  return handler(request);
}
