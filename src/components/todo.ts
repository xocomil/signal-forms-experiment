import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  Column,
  ColumnDef,
  createAngularTable,
  FlexRenderDirective,
  getCoreRowModel,
  getSortedRowModel,
} from '@tanstack/angular-table';
import { TodoModel } from '../models/todo.model';
import { TodoListStore } from '../stores/todo-list.store';
import { TodoForm } from './todo-form';

const defaultColumns: ColumnDef<TodoModel>[] = [
  {
    accessorKey: 'done',
    header: () => 'Done',
    footer: (info) => info.column.id,
    sortingFn: 'basic',
  },
  {
    accessorKey: 'name',
    header: () => 'Task Name',
    footer: (info) => info.column.id,
    sortingFn: 'basic',
  },
  {
    accessorKey: 'description',
    header: () => 'Description',
    footer: (info) => info.column.id,
    sortingFn: 'basic',
  },
  {
    accessorKey: 'taskImportance',
    header: 'Importance',
    footer: (info) => info.column.id,
    sortingFn: 'basic',
  },
  {
    accessorKey: 'randomNumber',
    header: 'Random',
    sortingFn: 'basic',
  },
] as const;

@Component({
  selector: 'app-todo',
  imports: [FlexRenderDirective, TodoForm],
  template: ` <div>
      <table class="table table-zebra table-pin-rows">
        <thead>
          @for (headerGroup of table.getHeaderGroups(); track headerGroup.id) {
            <tr>
              @for (header of headerGroup.headers; track header.id) {
                @if (!header.isPlaceholder) {
                  <th
                    class="cursor-pointer hover:bg-accent/10 transition-all duration-500 ease-in-out"
                    (click)="sortBy(header.column)"
                  >
                    <ng-container
                      *flexRender="
                        header.column.columnDef.header;
                        props: header.getContext();
                        let header
                      "
                    >
                      <div [innerHTML]="header"></div>
                    </ng-container>
                  </th>
                }
              }
            </tr>
          }
        </thead>
        <tbody>
          @for (row of table.getRowModel().rows; track row.id) {
            <tr
              class="cursor-pointer hover:bg-secondary/25 hover:text-secondary-content transition-all duration-500 ease-in-out"
              (click)="handleTodoClick(row.original)"
            >
              @for (cell of row.getVisibleCells(); track cell.id) {
                <td>
                  <ng-container
                    *flexRender="
                      cell.column.columnDef.cell;
                      props: cell.getContext();
                      let cell
                    "
                  >
                    <div [innerHTML]="cell"></div>
                  </ng-container>
                </td>
              }
            </tr>
          }
        </tbody>
      </table>
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

  protected readonly table = createAngularTable(() => ({
    data: this.store.todos(),
    columns: defaultColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  }));

  protected handleTodoClick(todo: TodoModel) {
    this.store.selectTodo(todo);
  }

  protected sortBy(column: Column<TodoModel>) {
    column.toggleSorting();

    console.log('sorting by', column.id, this.table.getState().sorting);
  }
}
