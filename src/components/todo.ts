import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Control, form } from '@angular/forms/signals';
import { Input } from '../controls/input';
import { RandomNumber } from '../controls/random-number';
import { todoFactory, TodoModel, todoSchema } from '../models/todo.model';
import { ProjectedInput, ProjectedInputStyles } from './projected-input';

@Component({
  selector: 'app-todo',
  imports: [
    JsonPipe,
    Control,
    RandomNumber,
    Input,
    ProjectedInput,
    ProjectedInputStyles,
  ],
  template: `<pre>{{ model() | json }}</pre>
    <hr />
    <form
      class="grid grid-cols-[30px_90px_minmax(120px,_1fr)_60px_50px] gap-x-2 items-baseline flex-wrap max-w-[75%]"
    >
      <input
        class="checkbox checkbox-success row-span-2"
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
      <!--      <app-input-->
      <!--        [control]="form.name"-->
      <!--        label="Task Name"-->
      <!--        placeholder="Name your task"-->
      <!--      />-->
      <app-projected-input [errors]="form.name().errors()" label="Task Name">
        <input
          [control]="form.name"
          [class.input-error]="form.name().invalid()"
          [disabled]="model().done"
          appDefaultStyle
          placeholder="Name your task"
          type="text"
        />
      </app-projected-input>

      <app-random-number
        [control]="form.randomNumber"
        [minValue]="150"
        [maxValue]="250"
      />
      <input class="input w-20" [control]="form.randomNumber" type="number" />
      <app-input
        class="col-span-4"
        [control]="form.description"
        label="Description"
        placeholder="Describe your task"
      />
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
