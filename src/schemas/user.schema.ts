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

  @Field(() =>String,{ nullable: true })
  address?: string | null;

  @Field(() => String, { nullable: true })
  phone_number?: string | null;

  @Field(() => Date, {nullable: true})
  created_at?: Date;
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

@InputType()
export class UpdateProfileInput {
  @Field({ nullable: true })
  address?: string;

  @Field({ nullable: true })
  phone_number?: string;
}

@ObjectType()
export class LoginResponse {
  @Field()
  token!: string;

  @Field(() => User, { nullable: true })
  user!: User | null;
}