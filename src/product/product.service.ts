import { Inject, Injectable } from '@nestjs/common';

import { Product } from './infra/typeorm/entities/product.entity';
import {
  IProductRepository,
  ICreateProduct,
} from './repositories/product.repository.interface';

interface Request {
  id?: string;
  name: string;
  description: string;
  slug: string;
  category?: string;
}

@Injectable()
export class ProductService {
  constructor(
    @Inject('ProductRepositoryInterface')
    private productRepository: IProductRepository,
  ) {}

  async findById(id: string): Promise<Product> {
    const product = await this.productRepository.findOne(id);

    if (!product) {
      throw new Error('Product is not exists.');
    }
    return product;
  }

  async findBySlug(id: string): Promise<Product> {
    const product = await this.productRepository.findBySlug(id);

    if (!product) {
      throw new Error('Product is not exists.');
    }

    return product;
  }

  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async create(input: ICreateProduct): Promise<Product> {
    const { slug, name, description } = input;

    const checkProductExists = await this.productRepository.findByName(name);

    if (checkProductExists) {
      throw new Error('Product already used.');
    }
    return this.productRepository.create(input);
  }

  async update(id: string, input: Request): Promise<Product> {
    const { description, name, slug, category } = input;
    const checkProductExists = await this.productRepository.findOne(id);

    if (!checkProductExists) {
      throw new Error('Product is not exists.');
    }

    const product = await this.productRepository.save({
      id,
      description,
      name,
      slug,
      category_id: category,
    });
    return product;
  }

  async delete(id: string): Promise<boolean> {
    const checkProductExists = await this.productRepository.findOne(id);

    if (!checkProductExists) {
      throw new Error('Product is not exists.');
    }
    try {
      await this.productRepository.delete(id);
      return true;
    } catch (error) {
      return false;
    }
  }
}
