import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsUUID, Length } from 'class-validator';

@InputType()
export class ProductCreateInput {
  @Field()
  @Length(5)
  name: string;

  @Field()
  @Length(5)
  slug: string;

  @Field({ nullable: true })
  category: string;

  @Field()
  description: string;
}
