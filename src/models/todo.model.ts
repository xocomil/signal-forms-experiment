import { max, min, minLength, required, schema } from '@angular/forms/signals';

export type TodoModel = {
  done: boolean;
  id: number;
  name: string;
  description: string;
};

export const todoSchema = schema<TodoModel>((form) => {
  required(form.id);
  min(form.id, 0);
  max(form.id, 999);

  required(form.name, {
    message: 'Please provide a name for your task.',
  });
  minLength(form.name, 3, {
    message: 'Name must be at least 3 characters long.',
  });

  required(form.description);
  minLength(form.description, 10);
});
