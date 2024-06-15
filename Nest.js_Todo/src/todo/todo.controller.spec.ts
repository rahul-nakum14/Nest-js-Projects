import { Test, TestingModule } from '@nestjs/testing';
import { TodosController } from './todo.controller';
import { TodosService } from './todo.service';

describe('TodoController', () => {
  let controller: TodosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodosController],
      providers: [TodosService],
    }).compile();

    controller = module.get<TodosController>(TodosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
