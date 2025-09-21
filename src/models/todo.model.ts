import { schema, validateStandardSchema } from '@angular/forms/signals';
import { z } from 'zod';

export const todoParser = z.object({
  done: z.boolean(),
  id: z.coerce.number().min(0).max(999),
  name: z.string().min(3),
  description: z.string().min(10),
});

export type TodoModel = z.infer<typeof todoParser>;

export const todoSchema = schema<TodoModel>((form) => {
  validateStandardSchema(form, todoParser);
});

export function todoFactory(): TodoModel {
  return {
    done: false,
    name: 'Learn Signal Forms',
    id: 0,
    description: 'Learn signal forms on stream and use cool things like zod.',
  };
}

// export type TodoModel = {
//   done: boolean;
//   id: number;
//   name: string;
//   description: string;
// };

// export const todoSchemaAngular = schema<TodoModel>((form) => {
//   required(form.id);
//   min(form.id, 0);
//   max(form.id, 999);
//
//   required(form.name, {
//     message: 'Please provide a name for your task.',
//   });
//   minLength(form.name, 3, {
//     message: 'Name must be at least 3 characters long.',
//   });
//
//   required(form.description);
//   minLength(form.description, 10);
// });
