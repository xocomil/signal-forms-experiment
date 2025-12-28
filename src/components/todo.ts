import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TodoListStore } from '../stores/todo-list.store';
import { TodoForm } from './todo-form';
import { TodoTable } from './todo-table';

@Component({
  selector: 'app-todo',
  imports: [TodoForm, TodoTable],
  standalone: true,
  template: ` <div class="flex justify-between items-center mb-4">
      <h2 class="text-2xl font-bold">Todo List</h2>
      <button class="btn btn-primary" (click)="addNewTodo()" type="button">
        ➕ Add New Todo
      </button>
    </div>
    <app-todo-table />
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

  protected addNewTodo() {
    this.store.createAndSelectNewTodo();
  }
}
