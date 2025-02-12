// import { Field, ObjectType } from "type-graphql";

// @ObjectType()
// export class Transaction {
//   @Field()
//   id!: string;

//   @Field()
//   amount!: number;

//   @Field()
//   type!: string;

//   @Field({ nullable: true })
//   from_user_id?: string | null;

//   @Field({ nullable: true })
//   to_user_id?: string | null;

//   @Field({ nullable: true })
//   from_wallet_id?: string | null;

//   @Field({ nullable: true })
//   to_wallet_id?: string | null;

//   @Field()
//   currency!: string;

//   @Field(() => Date)
//   created_at: Date | undefined;
// }

import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Transaction {
  @Field(() => String)
  id?: string;

  @Field(() => Number)
  amount?: number;

  @Field(() => String)
  type?: string;

  @Field(() => String, { nullable: true })
  from_user_id?: string;

  @Field(() => String, { nullable: true })
  to_user_id?: string;

  @Field(() => String, { nullable: true })
  from_wallet_id?: string;

  @Field(() => String, { nullable: true })
  to_wallet_id?: string;

  @Field(() => String)
  currency?: string;

  @Field(() => Date)
  created_at?: Date;
}