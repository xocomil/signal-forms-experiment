import { JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  model,
  output,
  signal,
} from '@angular/core';
import { Field, form } from '@angular/forms/signals';
import { Input } from '../controls/input';
import { RandomNumber } from '../controls/random-number';
import { StarInput } from '../controls/star-input';
import { todoFactory, TodoModel, todoSchema } from '../models/todo.model';
import { ProjectedInput, ProjectedInputStyles } from './projected-input';

@Component({
  selector: 'app-todo-form',
  imports: [
    Input,
    ProjectedInput,
    ProjectedInputStyles,
    RandomNumber,
    StarInput,
    Field,
    JsonPipe,
  ],
  template: `
    <form
      class="grid grid-cols-[30px_90px_minmax(120px,_1fr)_60px_90px_120px] gap-x-2 items-baseline flex-wrap max-w-[75%]"
    >
      <input
        class="checkbox checkbox-success row-span-2"
        [field]="form.done"
        type="checkbox"
      />
      <input
        class="input w-20"
        [class.input-error]="form.id().invalid()"
        [field]="form.id"
        placeholder="id"
        type="number"
      />
      <!--      <app-input-->
      <!--        [field]="form.name"-->
      <!--        label="Task Name"-->
      <!--        placeholder="Name your task"-->
      <!--      />-->
      <app-projected-input [errors]="form.name().errors()" label="Task Name">
        <input
          [field]="form.name"
          [class.input-error]="form.name().invalid()"
          appDefaultStyle
          placeholder="Name your task"
          type="text"
        />
      </app-projected-input>

      <app-random-number
        [field]="form.randomNumber"
        [minValue]="150"
        [maxValue]="250"
      />
      <input class="input w-20" [field]="form.taskImportance" type="number" />
      <app-star-input [field]="form.taskImportance" />
      <app-input
        class="col-span-5"
        [fieldTree]="form.description"
        label="Description"
        placeholder="Describe your task"
      />
      <button class="btn" (click)="cancel()" type="button">Cancel</button>
    </form>
    <hr />
    <pre>{{ form().errorSummary() | json }}</pre>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoForm {
  selectedTodo = model<TodoModel>();
  editCancelled = output();

  protected model = signal<TodoModel>(todoFactory());

  protected form = form(this.model, todoSchema);

  constructor() {
    effect(() => {
      const currentTodo = this.selectedTodo();

      console.log('currentTodo', currentTodo);

      this.model.set(currentTodo ?? todoFactory());
    });
  }

  protected cancel() {
    this.editCancelled.emit();
  }
}
