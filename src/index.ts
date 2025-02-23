import "reflect-metadata";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import bodyParser from "body-parser";
import { ApolloServer } from "@apollo/server";
import express from "express";
import { buildSchema } from "type-graphql";
import loadResolvers from "./loaders/loadResolvers";
import { GraphQLContext } from "./types";
import { authMiddleware } from "./middleware/authMiddleware";
import {AppError, errorHandler, ERROR_MAP} from "./middleware/errorHandler"

async function bootstrap() {
  try {
    // Dynamically load all resolvers
    const resolvers = await loadResolvers();

    // Build the GraphQL schema
    const schema = await buildSchema({
      resolvers: resolvers as [Function, ...Function[]], // Type assertion
      validate: false,

      // Ensure the user is authenticated
      authChecker:({context}) => {
        return !!context.user
      }
    });

    const server = new ApolloServer({ schema, formatError:(err) => {
      const originalError = err.extensions?.exception as AppError | Error;

      if(originalError instanceof AppError){
        return {
          message: originalError.message,
          statusCode: originalError.statusCode,
          details:originalError.details
        }
      }

      const {statusCode = 500, message = "Internal Server Error"} = originalError && ERROR_MAP[originalError.name] || {}

      return {message, statusCode}
    } });
    const app = express();

    await server.start();

    app.use(
      "/graphql",
      cors<cors.CorsRequest>({ origin: "*" }),
      bodyParser.json(),
      expressMiddleware(server, {
        context: async ({ req }): Promise<GraphQLContext> => {
          const context:GraphQLContext = {req};

          if(req.headers.authorization){

            await authMiddleware({context} as any, async () => {})
          }

          return context
        },
        
      })
    );

    app.use(errorHandler);


    app.listen({ port: 4000 }, () =>
      console.log(`🚀 Server ready at http://localhost:4000/graphql`)
    );
  } catch (error) {
    console.error("Failed to start the server:", error);
    process.exit(1);
  }
}

bootstrap();
