import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  ValidationPipe,
  UsePipes,
  UseGuards,
  Request,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { Todo } from './entities/todo.entity';
import { TodosService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ParseIntPipe } from './pipes/parseInt-pipe';
import { AuthGuard } from '@nestjs/passport';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('todos')
@UsePipes(new ValidationPipe())
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  async findAll(): Promise<Todo[]> {
    return this.todosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Todo | null> {
    return this.todosService.findOne(+id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(
    @Body() createTodoDto: CreateTodoDto,
    @Request() req: any,
  ): Promise<Todo> {
    return this.todosService.create(createTodoDto, req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTodoDto: UpdateTodoDto,
    @Request() req: any,
  ): Promise<{ msg: string; todo?: Todo }> {
    return this.todosService.update(+id, updateTodoDto, req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: any,
  ): Promise<{ msg: string; todo?: Todo }> {
    return this.todosService.remove(+id, req.user.userId);
  }
}
