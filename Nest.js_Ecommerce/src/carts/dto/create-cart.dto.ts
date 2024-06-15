import { IsDefined, IsNumber, IsString } from 'class-validator';

export class CreateCartDto {
  @IsDefined()
  @IsNumber()
  id: number;

  @IsNumber()
  product_id: number;

  @IsString()
  product_name: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  price: number;

  @IsNumber()
  userId: number;
}
