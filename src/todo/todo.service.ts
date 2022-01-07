import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './todo.entity';
import { TodoDto } from './todo.interface';

// import { v1 as uuid } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}

  // todoArray: Todo[] = [];

  // addTodo(title: string, subtitle: string) {
  //   console.log(`Title: ${title} sub title: ${subtitle}`);

  //   const todo = new Todo();
  //   // todo.id = uuid();
  //   todo.title = title;
  //   todo.subtitle = subtitle;
  //   this.todoRepository.create(todo);

  //   this.todoArray.push(todo);
  // }

  async addTodo(todo: TodoDto): Promise<Todo> {
    return await this.todoRepository.save(todo);
  }

  // getTodos() {
  //   return this.todoArray;
  // }

  getTodos(): Promise<Todo[]> {
    return this.todoRepository.find();
  }

  async removeById(id: number): Promise<void> {
    await this.todoRepository.delete({ id });
  }

  async removeTodoById(id: number) {
    const found = await this.todoRepository.findOne({ id });
    if (!found) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }
    await this.removeById(id);
  }
}
