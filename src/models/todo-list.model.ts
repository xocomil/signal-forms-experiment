import { z } from 'zod';
import { todoFactory, todoParser } from './todo.model';

export const todoListParser = z.array(todoParser);

export type TodoList = z.infer<typeof todoListParser>;

export function todoListFactory(): TodoList {
  return [
    todoFactory(),
    todoFactory({
      id: 2,
      name: 'Learn @angular/aria',
      description: "Because it's cool",
    }),
  ];
}
