import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CategoryDTO {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  slug: string;
}
