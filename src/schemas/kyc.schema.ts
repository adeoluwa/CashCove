import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class KYC {
  @Field()
  id!: string;

  @Field()
  user_id!: string;

  @Field()
  full_name!: string;

  @Field()
  address!: string;

  @Field()
  id_type!: string;

  @Field()
  id_number!: string;

  @Field()
  id_photo!: string;

  @Field()
  status!: string;

  @Field()
  created_at!: Date;

  @Field()
  updated_at!: Date ;
}