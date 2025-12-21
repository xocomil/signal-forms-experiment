import { withImmutableState } from '@angular-architects/ngrx-toolkit';
import { computed } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
} from '@ngrx/signals';
import { create } from 'mutative';
import { todoListFactory } from '../models/todo-list.model';
import {
  EditableTodoModel,
  isNonEditableKey,
  TodoModel,
  TodoModelKeys,
} from '../models/todo.model';

type SelectedState = {
  selectedTodo: TodoModel | undefined;
};

export const TodoListStore = signalStore(
  withImmutableState(todoListFactory()),
  withImmutableState<SelectedState>({
    selectedTodo: undefined,
  }),
  withComputed((store) => ({
    todoSelected: computed(() => store.selectedTodo()),
  })),
  withMethods((store) => ({
    selectTodo(todo: TodoModel) {
      patchState(store, { selectedTodo: todo });
    },
    deselectTodo() {
      patchState(store, { selectedTodo: undefined });
    },
  })),
  withMethods((store) => ({
    toggleTodo(todoToToggle: TodoModel) {
      store.deselectTodo();

      console.log('[toggleTodo] todo', todoToToggle);

      patchState(store, (state) =>
        create(state, (draft) => {
          const index = state.todos.findIndex(
            (todo) => todo.id === todoToToggle.id,
          );

          console.log('[toggleTodo] index', index, draft.todos[index]);

          draft.todos[index].done = !todoToToggle.done;
        }),
      );
    },
    saveTodo(todo: TodoModel) {
      const delta = createDelta(store.selectedTodo(), todo);

      console.log('[saveTodo] delta', delta);

      patchState(store, (state) =>
        create(state, (draft) => {
          const index = state.todos.findIndex(
            (todo) => todo.id === draft.selectedTodo?.id,
          );

          draft.todos[index] = { ...draft.todos[index], ...delta };
        }),
      );

      store.deselectTodo();
    },
  })),
);

function createDelta(
  currentTodo: TodoModel,
  newTodo: TodoModel,
): Partial<EditableTodoModel> {
  // Example of using reduce
  // const delta = Object.entries(newTodo).reduce((acc, [key, value]) => {
  //   return currentTodo[key] !== value ? { ...acc, [key]: value } : acc;
  // }, {} as Partial<TodoModel>);
  //
  // console.log('delta', delta);

  // Example of not using reduce
  const delta2 = Object.entries(newTodo).filter(([key, value]) => {
    if (isNonEditableKey(key as TodoModelKeys)) return false;

    return currentTodo[key] !== value;
  });

  console.log('delta2', Object.fromEntries(delta2));

  return Object.fromEntries(delta2);

  // return delta;
}
