import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/category/infra/typeorm/entities/category.entity';
import {
  ICreateProduct,
  IProductRepository,
} from 'src/product/repositories/product.repository.interface';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';

interface Request {
  name: string;
  description: string;
  slug: string;
}

export class ProductRepository implements IProductRepository {
  constructor(
    @InjectRepository(Product)
    private readonly repository: Repository<Product>,
  ) {}

  async find(): Promise<Product[]> {
    // const products = await this.repository.find({
    //   relations: ['category'],
    // });

    const productsQuery = this.repository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'products');
    //.where('available = :available', { available: true });

    // if (brand) {
    //   carsQuery.andWhere('c.brand = :brand', { brand });
    // }

    const products = await productsQuery.getMany();

    return products;
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.repository.findOne(id);

    return product;
  }
  async findBySlug(slug: string): Promise<Product | null> {
    const product = await this.repository.findOne({
      where: {
        slug,
      },
    });
    return product || null;
  }

  async findName(name: string): Promise<Product | null> {
    const product = await this.repository.findOne({
      where: {
        name,
      },
    });
    return product || null;
  }
  async delete(id: string): Promise<boolean> {
    try {
      await this.repository.delete(id);
      return true;
    } catch (error) {
      return false;
    }
  }

  async findByName(name: string): Promise<Product | null> {
    const findInSameName = await this.repository.findOne({
      where: {
        name,
      },
    });
    return findInSameName || null;
  }

  async create({ name, slug, description }: ICreateProduct): Promise<Product> {
    const product = this.repository.create({
      name,
      description,
      slug,
    });

    await this.repository.save(product);
    return product;
  }

  async save({
    id,
    name,
    slug,
    description,
    category_id,
  }: ICreateProduct): Promise<Product> {
    const product = await this.repository.save({
      id,
      name,
      description,
      slug,
      category_id,
    });

    return product;
  }
}
