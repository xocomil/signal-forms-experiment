import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Control, form } from '@angular/forms/signals';
import { RandomNumber } from '../controls/random-number';
import { todoFactory, TodoModel, todoSchema } from '../models/todo.model';
import { ZodErrorPipe } from '../pipes/zod-error-pipe';

@Component({
  selector: 'app-todo',
  imports: [JsonPipe, Control, ZodErrorPipe, RandomNumber],
  template: `<pre>{{ model() | json }}</pre>
    <hr />
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
        type="text"
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
          <p class="label text-error">{{ error | zodError }}</p>
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
          <p class="label text-error">{{ error | zodError }}</p>
        }
      </fieldset>
      <app-random-number
        [control]="form.randomNumber"
        [minValue]="1"
        [maxValue]="20"
      />
      <input [control]="form.randomNumber" type="number" />
    </form>`,
  styles: ``,
  host: {
    class: 'block ml-2 p-1',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Todo {
  protected model = signal<TodoModel>(todoFactory());

  protected form = form(this.model, todoSchema);
}
