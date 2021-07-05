import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoryResolver } from './category.resolvers';
import { CategoryService } from './category.service';
import { Category } from './infra/typeorm/entities/category.entity';
import { CategoryRepository } from './infra/typeorm/repositories/category.repository';
import { CategoryRepositoryInMemory } from './repositories/in-memory/category.repository.in-memory';

import { CategorySlugIsUnique } from './validations/CategorySlugIsUnique';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  providers: [
    CategoryService,
    CategoryResolver,
    CategorySlugIsUnique,
    {
      provide: 'CategoryRepositoryInterface',
      useClass:
        process.env.NODE_ENV == 'test'
          ? CategoryRepositoryInMemory
          : CategoryRepository,
    },
  ],
  exports: [],
})
export default class CategoryModule {}
