import { CategoryCreateInputDTO } from './dto/category-create-inputDTO';
import { Category } from './infra/typeorm/entities/category.entity';

export class CategoryMapper {
  public static toEntity(input: CategoryCreateInputDTO): Category {
    const categoryEntity = new Category();
    categoryEntity.name = input.name;
    categoryEntity.slug = input.slug;
    return categoryEntity;
  }
}
