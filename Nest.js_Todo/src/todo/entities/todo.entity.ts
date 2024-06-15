// src/entities/todo.entity.ts

import { Exclude } from 'class-transformer';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Exclude()
  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'created_By' })
  created_By: User;

  constructor(partial: Partial<Todo>) {
    Object.assign(this, partial);
  }
}
