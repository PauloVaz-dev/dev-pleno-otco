import { Product } from '../infra/typeorm/entities/product.entity';

export interface ICreateProduct {
  id?: string;
  name: string;
  description: string;
  slug: string;
  category_id?: string;
}

export interface IProductRepository {
  find(): Promise<Product[]>;
  findOne(id: string): Promise<Product>;
  findBySlug(slug: string): Promise<Product>;
  findByName(name: string): Promise<Product>;
  create(input: ICreateProduct): Promise<Product>;
  delete(id: string): Promise<boolean>;
  save({
    id,
    name,
    slug,
    description,
    category_id,
  }: ICreateProduct): Promise<Product>;
}
