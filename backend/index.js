import { ApolloServer } from "@apollo/server";

import { startStandaloneServer } from "@apollo/server/standalone";

const server = ApolloServer({
  typeDefs,
  resolvers,
});

const { uri } = await startStandaloneServer(server);

console.log(`Server ready at ${uri}`);
