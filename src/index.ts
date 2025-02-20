import "reflect-metadata";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import bodyParser from "body-parser";
import { ApolloServer } from "@apollo/server";
import express from "express";
import csurf from "csurf";
import { buildSchema } from "type-graphql";
import loadResolvers from "./loaders/loadResolvers";
import { ErrorHandler } from "./utils/error-handling";
import { GraphQLContext } from "./types";

async function bootstrap() {
  try {
    // Dynamically load all resolvers
    const resolvers = await loadResolvers();

    // Build the GraphQL schema
    const schema = await buildSchema({
      resolvers: resolvers as [Function, ...Function[]], // Type assertion
      validate: false,
    });

    const server = new ApolloServer({ schema });
    const app = express();

    await server.start();

    app.use(ErrorHandler);
    app.use(csurf);

    app.use(
      "/graphql",
      cors<cors.CorsRequest>(),
      bodyParser.json(),
      expressMiddleware(server, {
        context: async ({ req }): Promise<GraphQLContext> => ({ req }),
      })
    );

    app.listen({ port: 4000 }, () =>
      console.log(`🚀 Server ready at http://localhost:4000/graphql`)
    );
  } catch (error) {
    console.error("Failed to start the server:", error);
    process.exit(1);
  }
}

bootstrap();
