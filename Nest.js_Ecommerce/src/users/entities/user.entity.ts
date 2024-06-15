import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { Role } from '../enums/role.enum';
import { Cart } from 'src/carts/entities/cart.entity';

@Entity()
export class User {
  @Expose()
  @PrimaryGeneratedColumn()
  id: number;

  @Expose()
  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Exclude()
  @Column({
    type: 'enum',
    enum: Role,
    default: Role.user,
  })
  role: Role;

  @OneToMany(() => Cart, (cart) => cart.user)
  carts: Cart[];

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
