import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class LockedFunds {
  @Field()
  id!: string;

  @Field()
  user_id!: string;

  @Field()
  wallet_id!: string;

  @Field()
  amount!: number;

  @Field()
  currency!: string;

  @Field()
  unlock_date!: Date;

  @Field()
  penalty_fee!: number;

  @Field()
  created_at!: Date;

  @Field()
  updated_at!: Date;
}