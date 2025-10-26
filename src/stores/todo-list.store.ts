import { signalStore, withState } from '@ngrx/signals';
import { todoListFactory } from '../models/todo-list.model';

export const TodoListStore = signalStore(withState(todoListFactory()));
