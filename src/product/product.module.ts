import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './infra/typeorm/entities/product.entity';
import { ProductRepository } from './infra/typeorm/repositories/product.repository';

import { ProductResolver } from './product.resolvers';
import { ProductService } from './product.service';
import { ProductRepositoryInMemory } from './repositories/in-memory/product.repository.in-memory';
import { ProductSlugIsUnique } from './validations/ProductSlugIsUnique';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [
    ProductService,
    ProductResolver,
    ProductSlugIsUnique,
    {
      provide: 'ProductRepositoryInterface',
      useClass:
        process.env.NOD_ENV == 'test'
          ? ProductRepositoryInMemory
          : ProductRepository,
    },
  ],
})
export default class ProductModule {}
