import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  Control,
  form,
  max,
  min,
  minLength,
  required,
  schema,
} from '@angular/forms/signals';

type TodoModel = {
  done: boolean;
  id: number;
  name: string;
  description: string;
};

const todoSchema = schema<TodoModel>((form) => {
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

@Component({
  selector: 'app-todo',
  imports: [JsonPipe, Control],
  template: `<pre>{{ model() | json }}</pre>
    <br />
    <form class="flex gap-2 items-baseline">
      <input
        class="checkbox checkbox-success"
        [control]="form.done"
        type="checkbox"
      />
      <input
        class="input w-20"
        [class.input-error]="form.id().invalid()"
        [control]="form.id"
        placeholder="id"
        type="number"
      />
      <fieldset class="fieldset">
        <legend class="fieldset-legend">Task Name</legend>
        <input
          class="input"
          [class.input-error]="form.name().invalid()"
          [control]="form.name"
          placeholder="Name your task"
          type="text"
        />
        @let nameErrors = form.name().errors();
        @for (error of nameErrors; track error) {
          <p class="label text-error">{{ error.message }}</p>
        }
      </fieldset>
      <fieldset class="fieldset">
        <legend class="fieldset-legend">Task Description</legend>
        <textarea
          class="textarea"
          [class.textarea-error]="form.description().invalid()"
          [control]="form.description"
          placeholder="Describe your task"
        ></textarea>
        @let descriptionErrors = form.description().errors();
        @for (error of descriptionErrors; track error) {
          <p class="label text-error">{{ error.message }}</p>
        }
      </fieldset>
    </form>`,
  styles: ``,
  host: {
    class: 'block ml-2 p-1',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Todo {
  protected model = signal<TodoModel>({
    done: false,
    name: 'Learn Signal Forms',
    id: 0,
    description: 'Learn signal forms on stream and use cool things like zod.',
  });

  protected form = form(this.model, todoSchema);
}
