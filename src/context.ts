import { createPubSub } from "graphql-yoga";
import { DB } from "./seed/db";
import { PrismaClient } from "@prisma/client";

export type GraphQLContext = {
  db: typeof DB;
  pubSub: ReturnType<typeof createPubSub>;
  prisma: PrismaClient;
};

const PubSub = createPubSub(); // refactor : change logic to have a centralized pubSub Logic (graph)
const prisma = new PrismaClient();

export async function createContext(): Promise<GraphQLContext> {
  return { db: DB, pubSub: PubSub, prisma };
}
