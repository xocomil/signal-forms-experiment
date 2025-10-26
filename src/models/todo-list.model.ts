import { z } from 'zod';
import { todoFactory, todoParser } from './todo.model';

export const todoListParser = z.object({
  todos: z.array(todoParser),
});

export type TodoList = z.infer<typeof todoListParser>;

export function todoListFactory(): TodoList {
  return {
    todos: [
      todoFactory(),
      todoFactory({
        id: 2,
        name: 'Learn @angular/aria',
        description: "Because it's cool",
      }),
      todoFactory({
        id: 3,
        name: 'Explain factories vs const objects',
        description: 'Jason likes factories for lots of reasons',
        done: true,
      }),
    ],
  };
}
