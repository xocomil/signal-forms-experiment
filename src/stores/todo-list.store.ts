import { withImmutableState } from '@angular-architects/ngrx-toolkit';
import { computed } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
} from '@ngrx/signals';
import { todoListFactory } from '../models/todo-list.model';
import { TodoModel } from '../models/todo.model';

type SelectedState = {
  selectedTodo: TodoModel | undefined;
};

export const TodoListStore = signalStore(
  withImmutableState(todoListFactory()),
  withImmutableState<SelectedState>({ selectedTodo: undefined }),
  withComputed((state) => ({
    todoSelected: computed(() => state.selectedTodo()),
  })),
  withMethods((state) => ({
    selectTodo(todo: TodoModel) {
      patchState(state, { selectedTodo: todo });
    },
    deselectTodo() {
      patchState(state, { selectedTodo: undefined });
    },
  })),
);
