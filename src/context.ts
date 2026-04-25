import { createPubSub } from "graphql-yoga";
import { PrismaClient } from "@prisma/client";

export type GraphQLContext = {
  pubSub: ReturnType<typeof createPubSub>;
  prisma: PrismaClient;
};

const PubSub = createPubSub(); // refactor : change logic to have a centralized pubSub Logic (graph)
const prisma = new PrismaClient({ log: ["query"] }); // notre ORM

export async function createContext(): Promise<GraphQLContext> {
  return { pubSub: PubSub, prisma };
}
