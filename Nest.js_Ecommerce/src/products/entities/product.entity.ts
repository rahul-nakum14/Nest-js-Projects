import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  product_name: string;

  @Column()
  product_price: number;

  constructor(partial: Partial<Product>) {
    Object.assign(this, partial);
  }
}
