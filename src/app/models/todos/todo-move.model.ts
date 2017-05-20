import {Todo} from './todo.model';

export interface TodoMove {
  todo: Todo;
  direction: boolean;
}

export interface MovedTodos {
  todo: Todo;
  targetTodo: Todo;
}
