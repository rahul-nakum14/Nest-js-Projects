import { IsString, IsOptional } from 'class-validator';

export class UpdateTodoDto {
  @IsOptional()
  @IsString({ message: 'Title must be a string' })
  title: string;

  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  description: string;
}
