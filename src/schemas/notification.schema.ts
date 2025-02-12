import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Notification {
  @Field()
  id!: string;

  @Field()
  user_id!: string;

  @Field()
  message!: string;

  @Field()
  is_read!: boolean;

  @Field()
  created_at!: Date;

  @Field()
  updated_at!: Date;
}