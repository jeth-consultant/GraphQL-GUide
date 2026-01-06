import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";

import passport from "passport";
import session from "express-session";
import connectMongo from "connect-mongodb-session";

import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { expressMiddleware } from "@apollo/server/express4";

import mergeResolvers from "./resolvers/index.js";
import mergeTypeDefs from "./typeDefs/index.js";
import { connectDB } from "./db/connectDb.js";
import { configurePassport } from "./passport/passport.js";

dotenv.config();
configurePassport();

/* -------------------- APP SETUP -------------------- */
const app = express();
const httpServer = http.createServer(app);

/* -------------------- DATABASE -------------------- */
await connectDB();

/* -------------------- SESSION STORE -------------------- */
const MongoDBStore = connectMongo(session);

const store = new MongoDBStore({
  uri: process.env.MONGO_URI,
  collection: "sessions",
});

store.on("error", (err) => console.error("Session store error:", err));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

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
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
  express.json(),
  expressMiddleware(server, {
    context: async ({ req, res }) => ({ req, res }),
  })
);

/* -------------------- START SERVER -------------------- */
await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));

console.log("🚀 Server ready at http://localhost:4000/");
