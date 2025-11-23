import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TodoModel } from '../models/todo.model';
import { TodoListStore } from '../stores/todo-list.store';
import { TodoForm } from './todo-form';

@Component({
  selector: 'app-todo',
  imports: [JsonPipe, TodoForm],
  template: ` <div>
      @for (todo of store.todos(); track todo.id) {
        <pre class="hover:bg-primary/10" (click)="handleTodoClick(todo)">{{
          todo | json
        }}</pre>
      }
    </div>
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

  protected handleTodoClick(todo: TodoModel) {
    this.store.selectTodo(todo);
  }
}
