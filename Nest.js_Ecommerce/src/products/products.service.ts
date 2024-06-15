import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createproduInterfaces } from './interfaces/createProduct-interfaces';
import { updateproduInterfaces } from './interfaces/updateProduct-interfaces';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(createProduct: createproduInterfaces): Promise<Product> {
    const newProduct = new Product({
      ...createProduct,
    });
    return await this.productRepository.save(newProduct);
  }

  findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      this.displayExceptionMsg(NotFoundException, 'Product Not Found');
    }
    return product;
  }

  async update(
    id: number,
    updateProduct: updateproduInterfaces,
  ): Promise<{ msg: string; product: Product }> {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      this.displayExceptionMsg(NotFoundException, 'Product Not Found');
    }
    product.product_name = updateProduct.product_name ?? product.product_name;
    product.product_price =
      updateProduct.product_price ?? product.product_price;
    await this.productRepository.save(product);
    return { msg: 'Updated', product: product };
  }

  async remove(id: number): Promise<{ msg: string; product: Product }> {
    const product = await this.isProductExist(id);
    if (!product) {
      throw new NotFoundException('Product Not Found');
    }
    await this.productRepository.delete(id);
    return { msg: 'Deleted', product: product };
  }

  /** Private Methods Define now */
  private async isProductExist(id: number): Promise<Product | undefined> {
    return await this.productRepository.findOneBy({ id });
  }

  private displayExceptionMsg(exception: any, msg: string): never {
    throw new exception(msg);
  }
}
