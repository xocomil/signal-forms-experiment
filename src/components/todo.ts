import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TodoListStore } from '../stores/todo-list.store';
import { TodoForm } from './todo-form';
import { TodoTable } from './todo-table';

@Component({
  selector: 'app-todo',
  imports: [TodoForm, TodoTable],
  standalone: true,
  template: ` <app-todo-table />
    <hr />
    @if (store.todoSelected()) {
      @defer {
        <app-todo-form />
      }
    }`,
  styles: ``,
  host: {
    class: 'block ml-2 p-1',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TodoListStore],
})
export class Todo {
  protected readonly store = inject(TodoListStore);
}
