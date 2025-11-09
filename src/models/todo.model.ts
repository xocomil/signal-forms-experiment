import {
  disabled,
  max,
  min,
  schema,
  validateStandardSchema,
} from '@angular/forms/signals';
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
    .min(10, 'Please provide a description with at least 10 characters.'),
  randomNumber: z.coerce
    .number()
    .min(42, 'Please provide a number greater than 42.')
    .max(420, 'Please provide a number less than 420.'),
  taskImportance: z.coerce
    .number('Please proved a task importance from 0 to 5.')
    .int('Please provide an whole number for the task importance.')
    .min(0, 'Minimum task importance is 0.')
    .max(5, 'Maximum task importance is 5.'),
  createDate: z.date().nonoptional('Please provide a created date.'),
});

export type TodoModel = z.infer<typeof todoParser>;

export const todoSchema = schema<TodoModel>((form) => {
  validateStandardSchema(form, todoParser);
  // TODO: Can we make a zod binding function that works here?
  min(form.taskImportance, todoParser.shape.taskImportance.minValue);
  max(form.taskImportance, todoParser.shape.taskImportance.maxValue);

  // disabled(form.id, ({ valueOf }) => valueOf(form.done));
  // disabled(form.description, ({ valueOf }) => valueOf(form.done));
  // disabled(form.randomNumber, ({ valueOf }) => valueOf(form.done));
  const fields: Array<any> = [
    form.id,
    form.description,
    form.randomNumber,
    form.name,
    form.taskImportance,
  ];

  for (const field of fields) {
    disabled(field, ({ valueOf }) => valueOf(form.done));
  }
});

export function todoFactory(opts: Partial<TodoModel> = {}): TodoModel {
  const {
    done = false,
    name = 'Learn Signal Forms',
    id = 0,
    description = 'Learn signal forms on stream and use cool things like zod.',
    randomNumber = 42,
    taskImportance = 3,
    createDate = new Date(),
  } = opts;

  return {
    done,
    name,
    id,
    description,
    randomNumber,
    taskImportance,
    createDate,
  };
}
