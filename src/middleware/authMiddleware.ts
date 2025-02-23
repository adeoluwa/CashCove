import {MiddlewareFn} from "type-graphql";
import {verifyToken} from "../utils/auth"
import { GraphQLContext } from "../types";
import { info } from "../utils/logger";

const authMiddleware:MiddlewareFn<GraphQLContext> = async({context}, next) => {

  if(!context.req) throw new Error("Request object missing in context");
  
  const authHeader = context.req.headers.authorization;

  
  console.log("Authorization Header", authHeader); // Debugging

  if (!authHeader) throw new Error("Authorization token missing");

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verifyToken(token);
    console.log("Decoded Token:", decoded);
    
    context.user = decoded;

  } catch (error) {
    console.error("Token verification failed:", error)
    throw new Error("Invalid token");
  }

  return next()
}

export {authMiddleware}