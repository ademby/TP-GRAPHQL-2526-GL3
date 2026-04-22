import fs from "fs";
import path from "path";
import { createServer } from "http";
import { createPubSub, createSchema, createYoga } from "graphql-yoga";
import { DB } from "./seed/db";
import { Query } from "./resolvers/Query";
import { Cv } from "./resolvers/Cv";
import { User } from "./resolvers/User";
import { Mutation } from "./resolvers/Mutation";
import { Subscription } from "./resolvers/Subscription";

const PubSub = createPubSub();
export const schema = createSchema<{ db: any; pubSub: any }>({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf-8"),
  resolvers: {
    Query,
    Cv,
    User,
    Mutation,
    Subscription,
  },
});

function main() {
  const yoga = createYoga({ schema, context: { db: DB, pubSub: PubSub } });
  const server = createServer(yoga);
  server.listen(4000, () => {
    console.info("Server is running on http://localhost:4000/graphql");
  });
}

main();
