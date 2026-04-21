import { createServer } from 'node:http';
import { createSchema, createYoga } from 'graphql-yoga';
import type { GraphQLContext } from './graphql/context/GraphQLContext.js';
import { createAppContext } from './graphql/context/createContext.js';
import { resolvers } from './graphql/resolvers/index.js';
import { typeDefs } from './graphql/schema/typeDefs.js';

const appContext = createAppContext();

const yoga = createYoga<{}, GraphQLContext>({
  schema: createSchema({
    typeDefs,
    resolvers,
  }),
  context: async () => appContext,
  graphqlEndpoint: '/graphql',
  graphiql: true,
});

const server = createServer(yoga);
const port = Number(process.env.PORT ?? 4000);

server.listen(port, () => {
  console.log(`GraphQL server running at http://localhost:${port}/graphql`);
});
