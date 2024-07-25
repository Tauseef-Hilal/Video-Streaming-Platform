import { NextRequest } from "next/server";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { headers } from "next/headers";
import { JwtPayload } from "jsonwebtoken";

import schema from "@/lib/graphql/api/schema/schema";
import prismaClient from "@/lib/prisma";
import { verifyTokenAndGetPayload } from "@/lib/utils/auth";

const server = new ApolloServer({ schema });
const handler = startServerAndCreateNextHandler(server, {
  context: async () => {
    const authHeader = (headers().get("authorization") || "");
    const token = authHeader.replace("Bearer ", "");
    const payload = await verifyTokenAndGetPayload(token);

    if (payload) {
      return {
        prisma: prismaClient,
        userId: payload.userId,
      };
    }

    return { prisma: prismaClient };
  },
});

export async function GET(request: NextRequest) {
  return handler(request);
}

export async function POST(request: NextRequest) {
  return handler(request);
}
