import { IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty({ message: 'Product name should not be empty.' })
  product_name: string;

  @IsNotEmpty({ message: 'Product price should not be empty' })
  product_price: number;
}
