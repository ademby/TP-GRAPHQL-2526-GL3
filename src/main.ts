import fs from "fs";
import path from "path";
import { createServer } from "http";
import { createSchema, createYoga } from "graphql-yoga";
import { createContext, GraphQLContext } from "./context";
import { resolvers } from "./resolvers";

export const schema = createSchema<GraphQLContext>({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf-8"),
  resolvers: resolvers,
});

function main() {
  const yoga = createYoga({ schema, context: createContext });
  const server = createServer(yoga);
  server.listen(4000, () => {
    console.info("Server is running on http://localhost:4000/graphql");
  });
}

main();
