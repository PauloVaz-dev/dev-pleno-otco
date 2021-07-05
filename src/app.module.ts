import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import CategoryModule from './category/category.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get('DATABASE_URL'),
        autoLoadEntities: true,
        synchronize: true,
        logging: true,
      }),
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
    }),
    CategoryModule,   
  ],
})
export class AppModule {}
