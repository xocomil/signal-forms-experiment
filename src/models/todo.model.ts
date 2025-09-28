import { schema, validateStandardSchema } from '@angular/forms/signals';
import { z } from 'zod';

export const todoParser = z.object({
  done: z.boolean(),
  id: z.coerce
    .number('Please provide a number for the ID.')
    .nonnegative('Please provide a positive number for the ID.')
    .max(999, 'Please provide a number between 0 and 999 for the ID.'),
  name: z
    .string()
    .nonempty('Please provide a name for your task.')
    .min(3, 'Please provide a name with at least 3 characters.'),
  description: z
    .string()
    .nonempty('Please provide a description.')
    .min(10, 'PLease provide a description with at least 10 characters.'),
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
