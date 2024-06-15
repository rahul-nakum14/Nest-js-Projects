import { IsString, IsNumber, IsOptional, IsNotEmpty } from 'class-validator';

export class UpdateCartDto {
  @IsOptional()
  @IsNumber()
  @IsNotEmpty({ message: 'Product id should not be empty' })
  product_id: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'Product name should not be empty' })
  product_name?: string;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty({ message: 'quantity should not be empty' })
  quantity?: number;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty({ message: 'price should not be empty' })
  price?: number;
}
