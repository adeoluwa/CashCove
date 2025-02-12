import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class BankTransfer {
  @Field()
  id!: string;

  @Field()
  user_id!: string;

  @Field()
  amount!: number;

  @Field()
  currency!: string;

  @Field()
  recipient_bank_code!: string;

  @Field()
  recipient_account_number!: string;

  @Field()
  reference!: string;

  @Field()
  status!: string;

  @Field()
  created_at!: Date;

  @Field()
  updated_at!: Date;
}