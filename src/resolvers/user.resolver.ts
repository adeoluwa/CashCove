import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { UserService } from "../services/user.service";
import {
  RegisterInput,
  LoginInput,
  User,
  UpdateProfileInput,
} from "../schemas/user.schema";
import { generateToken } from "../utils/auth";
import { authMiddleware } from "../middleware/authMiddleware";
import { info } from "../utils/logger";
import { GraphQLContext } from "../types";

const userService = new UserService();

@Resolver()
export default class UserResolver {
  @Query(() => String)
  hello() {
    return "Hello, there!";
  }

  @Mutation(() => User)
  async register(@Arg("input") input: RegisterInput): Promise<User> {
    return await userService.register(input.email, input.password);
  }

  @Mutation(() => String)
  async login(@Arg("input") input: LoginInput): Promise<string> {
    const user = await userService.login(input.email, input.password);

    return generateToken(user.id);
  }

  @Mutation(() => User)
  async updateProfile(
    @Arg("input") input: UpdateProfileInput,
    @Ctx() cxt: GraphQLContext
  ): Promise<User> {
    const userId = cxt.user?.userId;

    if (!userId) throw new Error("Unauthorized");

    info({ message: "Aurhenticated User", params: { userId } });

    // if (!user) throw new Error("User not authenticated");

    return await userService.updateUsersProfile(userId, input);
  }
}
