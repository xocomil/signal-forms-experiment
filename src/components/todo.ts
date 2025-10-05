import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Control, form } from '@angular/forms/signals';
import { Input } from '../controls/input';
import { RandomNumber } from '../controls/random-number';
import { todoFactory, TodoModel, todoSchema } from '../models/todo.model';
import { ZodErrorPipe } from '../pipes/zod-error-pipe';

@Component({
  selector: 'app-todo',
  imports: [JsonPipe, Control, ZodErrorPipe, RandomNumber, Input],
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
      <app-input
        [control]="form.name"
        label="Task Name"
        placeholder="Name your task"
      />

      <!--      <fieldset class="fieldset">-->
      <!--        <legend class="fieldset-legend">Task Name</legend>-->
      <!--        <input-->
      <!--          class="input w-full"-->
      <!--          [class.input-error]="form.name().invalid()"-->
      <!--          [control]="form.name"-->
      <!--          placeholder="Name your task"-->
      <!--          type="text"-->
      <!--        />-->
      <!--        @let nameErrors = form.name().errors();-->
      <!--        @for (error of nameErrors; track error) {-->
      <!--          <p class="label text-error">{{ error | zodError }}</p>-->
      <!--        }-->
      <!--      </fieldset>-->
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
      <!--      <fieldset class="fieldset col-span-4">-->
      <!--        <legend class="fieldset-legend">Task Description</legend>-->
      <!--        <input-->
      <!--          class="input w-full"-->
      <!--          [class.textarea-error]="form.description().invalid()"-->
      <!--          [control]="form.description"-->
      <!--          type="text"-->
      <!--          placeholder="Describe your task"-->
      <!--        />-->
      <!--        @let descriptionErrors = form.description().errors();-->
      <!--        @for (error of descriptionErrors; track error) {-->
      <!--          <p class="label text-error">{{ error | zodError }}</p>-->
      <!--        }-->
      <!--      </fieldset>-->
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
