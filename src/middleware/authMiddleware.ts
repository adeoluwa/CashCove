import {MiddlewareFn} from "type-graphql";
import {verifyToken} from "../utils/auth"
import { GraphQLContext } from "../types";

const authMiddleware:MiddlewareFn<GraphQLContext> = async({context}, next) => {

  if(!context.req) throw new Error("Request object missing in context");
  
  const authHeader = context.req.headers.authorization;

  if (!authHeader) throw new Error("Authorization token missing");

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verifyToken(token);

    context.user = decoded;
  } catch (error) {
    throw new Error("Invalid token");
  }

  return next()
}

export {authMiddleware}