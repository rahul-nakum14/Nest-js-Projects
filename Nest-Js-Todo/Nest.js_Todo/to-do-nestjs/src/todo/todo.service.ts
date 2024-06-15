import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoCreateInterface } from './interfaces/todo-create-interface';
import { TodoUpdateInterface } from './interfaces/todo-update.interface';
import { Todo } from './entities/todo.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private todosRepository: Repository<Todo>,
  ) {}

  async findAll(): Promise<Todo[]> {
    return this.todosRepository.find();
  }

  async findOne(id: number): Promise<Todo> {
    const todo = await this.todosRepository.findOneBy({ id });
    if (!todo) {
      this.displayExceptionMsg(NotFoundException, 'Todo Not Found');
    }
    return todo;
  }

  async create(createTodo: TodoCreateInterface, userId: User): Promise<Todo> {
    const newTodo = new Todo({
      ...createTodo,
      created_By: userId,
    });
    return await this.todosRepository.save(newTodo);
  }

  async update(
    id: number,
    updateTodo: TodoUpdateInterface,
    userId: number,
  ): Promise<{ msg: string; todo: Todo }> {
    const todo = await this.todosRepository.findOne({
      where: { id },
      relations: ['created_By'],
    });

    if (!todo) {
      this.displayExceptionMsg(NotFoundException, 'Todo Not Found');
    }

    if (!this.isUserAuthorized(todo.created_By?.id, userId)) {
      this.displayExceptionMsg(
        UnauthorizedException,
        'Unauthorized access of todo for updation',
      );
    }
    todo.title = updateTodo.title ?? todo.title;
    todo.description = updateTodo.description ?? todo.description;

    const updatedTodo = await this.todosRepository.save(todo);
    return { msg: 'Updated', todo: updatedTodo };
  }

  async remove(
    id: number,
    userId: number,
  ): Promise<{ msg: string; todo: Todo }> {
    const todo = await this.todosRepository.findOne({
      where: { id },
      relations: ['created_By'],
    });
    if (!todo) {
      this.displayExceptionMsg(NotFoundException, 'Todo Not Found');
    }

    if (!this.isUserAuthorized(todo.created_By?.id, userId)) {
      this.displayExceptionMsg(
        UnauthorizedException,
        'Unauthorized access of todo for updation',
      );
    }

    await this.todosRepository.delete(id);
    return { msg: 'Deleted', todo };
  }

  private isUserAuthorized(
    createdById: number | undefined,
    userId: number,
  ): boolean {
    return createdById === userId;
  }

  private displayExceptionMsg(exception: any, msg: string): never {
    throw new exception(msg);
  }
}
