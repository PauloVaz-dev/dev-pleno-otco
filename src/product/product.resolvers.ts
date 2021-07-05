import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductUpdateInput } from './dto/product-update.input';
import { ProductCreateInput } from './dto/product-create.input';
import { ProductDTO } from './dto/productDTO';
import { ProductMapper } from './product.mapper';
import { ProductService } from './product.service';

@Resolver((of) => ProductDTO)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Query((returns) => [ProductDTO])
  async getAllProducts(): Promise<ProductDTO[]> {
    const products = await this.productService.findAll();
    return products;
  }

  @Query((returns) => ProductDTO)
  async getProductById(@Args('id') input: string): Promise<ProductDTO> {
    return await this.productService.findById(input);
  }

  @Query((returns) => ProductDTO)
  async getProductBySlug(@Args('slug') input: string): Promise<ProductDTO> {
    return await this.productService.findBySlug(input);
  }

  @Mutation((returns) => ProductDTO)
  async createProduct(
    @Args('input') input: ProductCreateInput,
  ): Promise<ProductDTO> {
    return await this.productService.create(input);
  }

  @Mutation((returns) => ProductDTO)
  async updateProduct(
    @Args('input') input: ProductUpdateInput,
  ): Promise<ProductDTO> {
    return await this.productService.update(input.id, input);
  }

  @Mutation((returns) => Boolean)
  async deleteProduct(@Args('id') id: string): Promise<boolean> {
    await this.productService.delete(id);
    return true;
  }
}
