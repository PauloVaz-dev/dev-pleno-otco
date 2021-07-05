import { Injectable } from '@nestjs/common';
import { Category } from 'src/category/infra/typeorm/entities/category.entity';
import { Product } from '../../infra/typeorm/entities/product.entity';
import {
  ICreateProduct,
  IProductRepository,
} from '../product.repository.interface';
@Injectable()
export class ProductRepositoryInMemory implements IProductRepository {
  products: Product[] = [];
  categories: Category;

  async findOne(id: string): Promise<Product> {
    const product = this.products.find((product) => product.id === id);
    return product;
  }

  async findByName(name: string): Promise<Product | null> {
    const product = this.products.find((product) => product.name === name);
    return product || null;
  }

  async findBySlug(slug: string): Promise<Product> {
    const product = this.products.find((product) => product.slug === slug);

    return product;
  }

  async delete(id: string): Promise<boolean> {
    const userToken = this.products.find((category) => category.id === id);
    this.products.splice(this.products.indexOf(userToken));
    return true;
  }

  async find(): Promise<Product[]> {
    const list = this.products;
    return list;
  }
  async create({ name, slug, description }: ICreateProduct): Promise<Product> {
    const category = new Product();

    Object.assign(category, {
      name,
      slug,
      description,
    });

    this.products.push(category);

    return category;
  }

  async save({
    id,
    name,
    slug,
    description,
    category_id,
  }: ICreateProduct): Promise<Product> {
    const findIndex = this.products.findIndex((product) => product.id === id);
    this.products[findIndex].name = name;
    this.products[findIndex].slug = slug;
    this.products[findIndex].category_id = category_id;

    const product = {
      id,
      name,
      slug,
      description,
      category_id,
      created_at: new Date(),
      updated_at: new Date(),
    };
    return product;
  }
}
