import { ProductCreateInput } from './dto/product-create.input';

import { ProductUpdateInput } from './dto/product-update.input';
import { ProductDTO } from './dto/productDTO';
import { CategoryDTO } from 'src/category/dto/categoryDTO';
import { Category } from '../category/infra/typeorm/entities/category.entity';
import { Product } from './infra/typeorm/entities/product.entity';

export class ProductMapper {
  public static toEntity(input: ProductCreateInput): Product {
    const entity = new Product();
    entity.name = input.name;
    entity.slug = input.slug;
    entity.description = input.description;

    const category = new Category();
    category.id = input.category;
    entity.category = category;
    return entity;
  }

  public static updatedToEntity(input: ProductUpdateInput): Product {
    const entity = new Product();
    entity.id = input.id;
    entity.name = input.name;
    entity.slug = input.slug;
    entity.description = input.description;

    const category = new Category();

    category.id = input.category;
    entity.category = category;

    return entity;
  }

  public static fromEntityToPublic(input: Product): ProductDTO {
    const entity = new ProductDTO();
    entity.id = input.id;
    entity.name = input.name;
    entity.slug = input.slug;
    entity.description = input.description;
    entity.category = input.category;
    return entity;
  }
}
