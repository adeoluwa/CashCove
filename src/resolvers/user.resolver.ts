import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { UserService } from "../services/user.service";
import { RegisterInput, LoginInput, User } from "../schemas/user.schema";
import { generateToken } from "../utils/auth";

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
}
