import { ApolloServer } from "@apollo/server";

import { startStandaloneServer } from "@apollo/server/standalone";
import mergeResolver from "./resolvers/index.js";

const server = ApolloServer({
  typeDefs,
  resolvers: mergeResolver,
});

const { uri } = await startStandaloneServer(server);

console.log(`Server ready at ${uri}`);
