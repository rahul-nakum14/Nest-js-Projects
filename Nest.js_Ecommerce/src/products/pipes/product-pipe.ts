import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';

@Injectable()
export class ProductValidationPipe implements PipeTransform {
  transform(value: CreateProductDto) {
    if (!value.product_name || !value.product_price) {
      throw new BadRequestException('Name and price are required');
    }
    // Validate product name
    if (
      typeof value.product_name !== 'string' ||
      value.product_name.trim().length === 0
    ) {
      throw new BadRequestException('Invalid product name');
    }

    // Validate product price
    const priceRegex = /^\d+(\.\d{1,2})?$/;
    if (!priceRegex.test(value.product_price.toString())) {
      throw new BadRequestException(
        'Invalid product price format it should be an integere',
      );
    }
    return value;
  }
}
