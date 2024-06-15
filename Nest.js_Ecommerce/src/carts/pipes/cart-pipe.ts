import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { CreateCartDto } from '../dto/create-cart.dto';

@Injectable()
export class CartValidationPipe implements PipeTransform {
  transform(value: CreateCartDto) {
    if (!value.product_id || !value.quantity) {
      throw new BadRequestException('Product Id and quantity are required');
    }
    // // Validate product name
    // if (
    //   typeof value.product_name !== 'string' ||
    //   value.product_name.trim().length === 0
    // ) {
    //   throw new BadRequestException('Invalid product name');
    // }

    // Validate product price
    // const priceRegex = /^\d+(\.\d{1,2})?$/;
    // if (!priceRegex.test(value.price.toString())) {
    //   throw new BadRequestException(
    //     'Invalid product price format it should be an integere',
    //   );
    // }

    return value;
  }
}
