import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchemaSync } from "type-graphql";
import GithubResolver from "./Github/Github.resolver";

const schema = buildSchemaSync({
  resolvers: [GithubResolver],
});

const app = express();

app.get("/hello", (_req, res) => res.send("Hello World"));

const server = new ApolloServer({ schema });
server.applyMiddleware({ app });

export default app;
