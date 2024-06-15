// todo.module.ts
import { Module } from '@nestjs/common';
import { TodosService } from './todo.service';
import { TodosController } from './todo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { JwtStrategy } from 'src/common/jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([Todo])],
  controllers: [TodosController],
  providers: [TodosService, JwtStrategy],
})
export class TodoModule {}
