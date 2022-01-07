import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TodoDto } from './todo.interface';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}
  @Get()
  getTodos() {
    return this.todoService.getTodos();
  }

  @Post()
  // @Body('title') title: string, @Body('subtitle') subtitle: string
  postTodo(@Body() todo: TodoDto) {
    return this.todoService.addTodo(todo);
  }

  @Delete('/:id')
  deleteTodoById(@Param('id') id: number) {
    return this.todoService.removeTodoById(id);
  }
}
