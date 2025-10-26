import { JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { Field, form } from '@angular/forms/signals';
import { Input } from '../controls/input';
import { RandomNumber } from '../controls/random-number';
import { StarInput } from '../controls/star-input';
import { todoFactory, TodoModel, todoSchema } from '../models/todo.model';
import { TodoListStore } from '../stores/todo-list.store';
import { ProjectedInput, ProjectedInputStyles } from './projected-input';

@Component({
  selector: 'app-todo',
  imports: [
    Field,
    Input,
    JsonPipe,
    ProjectedInput,
    ProjectedInputStyles,
    RandomNumber,
    StarInput,
  ],
  template: `<pre>{{ form().errorSummary() | json }}</pre>
    <hr />
    <div>
      @for (todo of store.todos(); track todo.id) {
        <pre class="hover:bg-primary/10" (click)="handleTodoClick(todo)">{{
          todo | json
        }}</pre>
      }
    </div>
    <hr />
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
        type="text"
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
          [disabled]="model().done"
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
        [field]="form.description"
        label="Description"
        placeholder="Describe your task"
      />
    </form>`,
  styles: ``,
  host: {
    class: 'block ml-2 p-1',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TodoListStore],
})
export class Todo {
  protected readonly store = inject(TodoListStore);

  protected model = signal<TodoModel>(todoFactory());

  protected form = form(this.model, todoSchema);

  protected handleTodoClick(todo: TodoModel) {
    alert(JSON.stringify(todo));
  }
}
