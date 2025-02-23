import { createParameterDecorator } from "type-graphql";
import { GraphQLContext } from "../types";
import { AppError } from "./errorHandler";

export function CurrentUser() {
  return createParameterDecorator<GraphQLContext>(({ context }) => {
    if (!context.user?.userId)
      throw new AppError("Unauthorized: User ID is missing", 401);

    return context.user?.userId;
  });
}
