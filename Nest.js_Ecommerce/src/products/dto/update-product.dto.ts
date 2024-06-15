import { IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  @IsNotEmpty({ message: 'Product name should not be empty' })
  product_name: string;

  @IsOptional()
  @IsNumber({}, { message: 'Product price should be a number' })
  @IsNotEmpty({ message: 'Product price should not be empty' })
  product_price: number;
}
