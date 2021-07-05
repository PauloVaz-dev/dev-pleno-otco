import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Length } from 'class-validator';

@InputType()
export class ProductUpdateInput {
  @Field()
  id: string;

  @Field()
  @Length(10)
  name: string;

  @Field()
  slug: string;

  @Field({ nullable: true })
  category: string;

  @Field()
  description: string;
}
