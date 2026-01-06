import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";

import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { expressMiddleware } from "@apollo/server/express4";

import mergeResolvers from "./resolvers/index.js";
import mergeTypeDefs from "./typeDefs/index.js";
import {connectDB} from "./db/connectDb.js";

dotenv.config();

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
await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
await connectDB();

console.log("🚀 Server ready at http://localhost:4000/");
