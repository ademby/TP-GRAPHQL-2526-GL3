import fs from "fs";
import path from "path";
import { createServer } from "http";
import { createPubSub, createSchema, createYoga } from "graphql-yoga";
import { Query } from "./resolvers/Query";

export const schema = createSchema({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf-8"),
  resolvers: {
    Query,
  },
});
export const pubSub = createPubSub();

function main() {
  const yoga = createYoga({ schema });
  const server = createServer(yoga);
  server.listen(4000, () => {
    console.info("Server is running on http://localhost:4000/graphql");
  });
}

main();
