import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { UserService } from "../services/user.service";
import {
  RegisterInput,
  LoginInput,
  User,
  UpdateProfileInput,
  LoginResponse,
} from "../schemas/user.schema";
import { generateToken } from "../utils/auth";
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

  @Mutation(() => LoginResponse)
  async login(@Arg("input") input: LoginInput): Promise<LoginResponse> {
    const user = await userService.login(input.email, input.password);

    const token = generateToken(user.id);

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        account_number: user.account_number,
        phone_number: user.phone_number,
      },
    };
  }

  @Mutation(() => User)
  async updateProfile(
    @Arg("input") input: UpdateProfileInput,
    @Ctx() cxt: GraphQLContext
  ): Promise<User> {
    const userId = cxt.user?.userId;
    console.log("Logged In user:", userId )

    if (!userId) throw new Error("Unauthorized");

    info({ message: "Aurhenticated User", params: { userId } });

    return await userService.updateUsersProfile(userId, input);
  }
}
