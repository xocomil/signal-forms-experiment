import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Signal,
  TemplateRef,
  viewChild,
} from '@angular/core';
import {
  Column,
  ColumnDef,
  createAngularTable,
  FlexRenderDirective,
  getCoreRowModel,
  getSortedRowModel,
  HeaderContext,
} from '@tanstack/angular-table';
import { isTaskDescription, TodoModel } from '../models/todo.model';
import { TodoListStore } from '../stores/todo-list.store';
import { HeaderDirectionPipe } from './headerDirection-pipe';

const defaultColumns = (
  taskCellTemplate: Signal<TemplateRef<any>>,
): ColumnDef<TodoModel>[] =>
  [
    {
      accessorKey: 'done',
      header: 'Done',
      sortingFn: 'basic',
      cell: () => taskCellTemplate(),
    },
    {
      header: 'Task',
      accessorFn: ({ name, description }) => ({ name, description }),
      cell: (task) => {
        const currentTask = task.getValue();

        if (!isTaskDescription(currentTask)) {
          return `<i class="text-sm text-neutral-500">No Task Found!</i>`;
        }

        return `<b>${currentTask.name}</b><br>
<i class="text-sm text-neutral-500">${currentTask.description}</i>`;
      },
      enableSorting: false,
    },
    {
      accessorKey: 'taskImportance',
      header: 'Importance',
      sortingFn: 'basic',
    },
    {
      accessorKey: 'randomNumber',
      header: 'Random',
      sortingFn: 'basic',
    },
  ] as const;

@Component({
  selector: 'app-todo-table',
  imports: [FlexRenderDirective, HeaderDirectionPipe],
  standalone: true,
  template: `
    <table class="table table-zebra table-pin-rows">
      <thead>
        @for (headerGroup of table.getHeaderGroups(); track headerGroup.id) {
          <tr>
            @for (header of headerGroup.headers; track header.id) {
              @if (!header.isPlaceholder) {
                @if (header.column.getCanSort()) {
                  <th
                    class="cursor-pointer hover:bg-accent/10 transition-all duration-500 ease-in-out"
                    (click)="sortBy(header.column)"
                  >
                    <ng-container
                      *flexRender="
                        header.column.columnDef.header;
                        props: header.getContext();
                        let headerContent
                      "
                    >
                      <div class="flex flex-row gap-1">
                        <div [innerHTML]="headerContent"></div>
                        <div class="text-primary text-right">
                          {{ header.column | headerDirection }}
                        </div>
                      </div>
                    </ng-container>
                  </th>
                } @else {
                  <th>
                    <ng-container
                      *flexRender="
                        header.column.columnDef.header;
                        props: header.getContext();
                        let headerContent
                      "
                    >
                      <div [innerHTML]="headerContent"></div>
                    </ng-container>
                  </th>
                }
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
                    let cellContent
                  "
                >
                  <div [innerHTML]="cellContent"></div>
                </ng-container>
              </td>
            }
          </tr>
        }
      </tbody>
    </table>
    <ng-template #taskCheckbox let-context>
      <input
        class="checkbox checkbox-success"
        [checked]="context.getValue()"
        (change)="changeChecked(context.row.original)"
        (click)="$event.stopPropagation()"
        type="checkbox"
      />
    </ng-template>
  `,
  styles: ``,
  host: {
    class: 'block',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoTable {
  readonly #store = inject(TodoListStore);

  protected readonly taskCheckbox =
    viewChild.required<TemplateRef<{ $implicit: HeaderContext<any, any> }>>(
      'taskCheckbox',
    );

  protected readonly table = createAngularTable(() => ({
    data: this.#store.todos(),
    columns: defaultColumns(this.taskCheckbox),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  }));

  protected handleTodoClick(todo: TodoModel) {
    this.#store.selectTodo(todo);
  }

  protected sortBy(column: Column<TodoModel>) {
    column.toggleSorting();
  }

  protected changeChecked(currentTodo: TodoModel) {
    this.#store.toggleTodo(currentTodo);
  }
}
