import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { expressMiddleware } from "@apollo/server/express4";

import express from "express";
import http from "http";
import cors from "cors";

import mergeResolvers from "./resolvers/index.js";
import mergeTypeDefs from "./typeDefs/index.js";

/* -------------------- APP SETUP -------------------- */
const app = express();
const httpServer = http.createServer(app);

/* -------------------- APOLLO SERVER -------------------- */
const server = new ApolloServer({
  typeDefs: mergeTypeDefs,
  resolvers: mergeResolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

/* -------------------- MIDDLEWARE -------------------- */
app.use(
  "/",
  cors(),
  express.json(),
  expressMiddleware(server, {
    context: async ({ req }) => ({ req }),
  })
);

/* -------------------- START SERVER -------------------- */
await new Promise((resolve) =>
  httpServer.listen({ port: 4000 }, resolve)
);

console.log("🚀 Server ready at http://localhost:4000/");
