import { ApolloServer } from "@apollo/server";

import { startStandaloneServer } from "@apollo/server/standalone";
import mergeResolver from "./resolvers/index.js";
import mergeTypeDef from "./typeDefs/index.js";

const server = new ApolloServer({
  typeDefs: mergeTypeDef,
  resolvers: mergeResolver,
});

const { uri } = await startStandaloneServer(server);

console.log(`Server ready at ${uri}`);
