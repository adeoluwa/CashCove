import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Wallet {
  @Field()
  id!: string;

  @Field()
  user_id!: string;

  @Field()
  balance!: number;

  @Field()
  currency!: string;

  @Field(() => Date)
  created_at: Date | undefined;

  @Field(() => Date)
  updated_at!: Date;
}
