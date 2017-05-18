import {Todo} from './todo.model';

export interface TodoMove {
  todo: Todo;
  direction: boolean;
}
