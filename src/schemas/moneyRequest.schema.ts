import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class MoneyRequest {
  @Field()
  id!: string;

  @Field()
  amount!: number;

  @Field()
  currency!: string;

  @Field()
  status!: string;

  @Field()
  from_user_id!: string;

  @Field()
  to_user_id!: string;

  @Field(() => Date)
  created_at: Date | undefined;

  @Field(() => Date)
  updated_at: Date | undefined;
}