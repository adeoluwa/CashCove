import "reflect-metadata";
import { Field, InputType, ObjectType } from "type-graphql";

@ObjectType()
export class User {
  @Field()
  id!: string;

  @Field()
  email!: string;

  @Field()
  account_number!: string;

  @Field(() => Date)
  created_at: Date | undefined;
}

@InputType()
export class RegisterInput {
  @Field()
  email!: string;

  @Field()
  password!: string;
}

@InputType()
export class LoginInput {
  @Field()
  email!: string;

  @Field()
  password!: string;
}